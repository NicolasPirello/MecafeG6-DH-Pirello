const db = require('../../database/models');
const path = require('path');
const { Cart } = require("../../database/models");

let cartController = {
    index: (req,res) => {
        let userId =  req.session.user.id;

        db.DetailCart.findAll(          
            {include: [
                {
                    model: db.Cart, as: "carts", where: {'user_id': userId}, attributes: []
                },
                {
                    model: db.ProductGrame, as: "products_grames", 
                    attributes: ['grames','price'], 
                    include: [{
                        model: db.Product, as: "products", attributes:['name'] , 
                        include: [
                            {model: db.Brand, as: "brands"},
                            {model: db.ImageProduct, as: "images_products", attributes: ['path']}
                        ]
                    }]
                },
                {
                    model: db.ProductTypeGrinding, as: "products_type_grindings", 
                    attributes:['type_grinding_id'], 
                    include : [{
                        model: db.TypeGrinding, as: "type_grindings" , attributes: ['name']}
                    ]
                },
            ]}        
        )
        .then((detailsCart) => { 
            //res.send(detailsCart);
            res.render(path.resolve(__dirname,"../views/cart.ejs"),{detailsCart:detailsCart})
        });
    },

    update: (req, res) => {
        let detailsCart = Object.entries(req.body);

        detailsCart.forEach((item) => {
            //envío como name detailCart_id siendo id el id de detailCart
            let idDetailCart = item[0].split('_')[1]; //(no es lo mas bonito pero no se me ocurrió nada mas)
            let quantity = item[1];           

            if(quantity > 0){ //actualizar
                db.DetailCart.update({
                    quantity: quantity,
                },{where : {id: idDetailCart}})
            }else{ //eliminar
                db.DetailCart.destroy({
                    where: {
                        id: idDetailCart
                    }
                })
            }
        })

        //hago esperar 1 sengudo para que se termine de actualizar el carrito (obvio falta un await porque esto no es bonito :c)
        sleep(1000).then(() => { 
            res.redirect('/cart'); 
        });       
    },

    addProduct: (req, res) => {
        let userId =  req.session.user.id;
        let idProductGrame = req.body.idProductGrame;
        let idProductTypeGrinding = req.body.idProductTypeGrinding;
        let quantity = req.body.quantity;

        //para obtener idCarrito :
        let cart = db.Cart.findOne({where: { user_id: userId }});
        //para obtener idProducto y poder redireccionar a la vista detalle :
        let productGrame = db.ProductGrame.findByPk(idProductGrame);

        Promise.all([cart,productGrame])
            .then(([cart,productGrame]) => {
                db.DetailCart.findOne(
                { 
                    where: {
                        cart_id: cart.id,
                        product_grame_id: idProductGrame,
                        product_type_grinding_id: idProductTypeGrinding
                    }
                })
                .then((detailCart) => {
                    if(detailCart){ //si el producto ya está añadido en el carrito, solo añadimos las unidades que se quieres agregar
                        db.DetailCart.update({
                            quantity: parseInt(detailCart.quantity) + parseInt(quantity)
                        },{
                            where: {
                                id: detailCart.id
                            }                                
                        })
                    }else{ //si no esta el producto en el carrito, creamos el registro
                        db.DetailCart.create({
                            cart_id: cart.id,
                            product_grame_id: idProductGrame,
                            product_type_grinding_id: idProductTypeGrinding,
                            quantity: quantity
                        })
                    }

                    sleep(1000).then(() => { 
                        res.redirect('/product/detail/' + productGrame.product_id);
                    }); 
                })
            })
    },

    getQuantity: (req, res) => {
        userId =  req.session.user.id;

        db.Cart.findOne({where: { user_id: userId }}).then((cart) => {
            db.DetailCart.findAll({where: { cart_id: cart.id }}).then((detailsCarts) =>{
                let total = detailsCarts.reduce(function (previousValue, currentValue) {
                    return previousValue + currentValue.quantity;
                }, 0);

                return res.status(200).json({total: total, status: 200});
            })
        })
    },

    checkout: (req, res) => {  
        let userId= req.session.user.id;
        let directions =  db.Direction.findAll({ where:{user_id:userId, active: true}, order: [['default', 'desc']]})
        let detailCart =  db.DetailCart.findAll(          
            {include: [
                {
                    model: db.Cart, as: "carts", where: {'user_id': userId}, attributes: []
                },
                {
                    model: db.ProductGrame, as: "products_grames", 
                    attributes: ['grames','price'], 
                    include: [{
                        model: db.Product, as: "products", attributes:['name']
                    }]
                },
                {
                    model: db.ProductTypeGrinding, as: "products_type_grindings", 
                    attributes:['type_grinding_id'], 
                    include : [{
                        model: db.TypeGrinding, as: "type_grindings" , attributes: ['name']}
                    ]
                },
            ]}        
        );

        Promise.all([directions,detailCart]).then(([directions,detailCart]) => {
            let direction = {
                "id": '',
                "name": '',
                "street": '',
                "city": '',
                "region": '',
                "country": '',
                "address_code": ''
            }

            if(directions.length >0 ) {
                direction = directions[0];
            }
            
            res.render(path.resolve(__dirname,"../views/checkout.ejs"),{directions:directions,detailCart:detailCart, direction:direction })
        })


        
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = cartController;

