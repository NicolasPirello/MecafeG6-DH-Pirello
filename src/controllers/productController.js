const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');

//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');
//Aquí tienen otra forma de llamar a los modelos creados

/* Pasos:

Todo esto se empieza en la hoja de rutas.

1: Importamos const {check} = require('express-validator');
2: Creamos una constante con el nombre que querramos que debera ser un array.
3: Creamos las validaciones que necesitemos, podemos crear tambien validaciones CUSTOM.
4: Esto lo hacemos llamando a check("") donde dentro de las comillas ponemos el name del formulario.
5: Si haces mas de una validacion, a todas las anteriores a la ultima ponerle .bail() para cortar la ejecucion de la que le sigue
6: En la ruta despues de las imagenes de multer ponemos la variable de las validaciones.

Sigo en la hoja de controllers

7: Nos vamos a controladores y pedimos "const { validationResult } = require('express-validator');"
8: Creamos la variable errors que contiene "let errors = validationResult(req)"

    errors: [
        {
        value: '',
        msg: 'Escribe un nombre de producto.',
        param: 'nameProduct',
        location: 'body'
        }
    ]
    }

9: Hacemos un if () para que si hay errores frene la ejecucion y sino siga pa adelante.
10: En el else del if cuando renderizamos de nuevo la vista mandamos los errores y los datos antiguos para persistirlos. {errors: errors.mapped(), old: req.body}

11: errors.mapped() Va a enviar algo como esto. Donde estan los campos con errores.

    {
    "nameProduct": {
        "value": "",
        "msg": "Escribe un nombre de producto.",
        "param": "nameProduct",
        "location": "body"
    }}

12:

*/


let productController = {

    // Muestra todos los productos - LISTO
    // TODO - Pedirle a Joha que me explique esto porque recuerdo que lo hicimos pero me olvide el association.

    index: (req, res) => {
        
        let categories = req.query.idCategories ? req.query.idCategories : [];
        let grames = req.query.grames ? req.query.grames : [];
        let idCategories = Array.isArray(categories) ?  categories : [categories];
        grames = Array.isArray(grames) ? grames : [grames];

        let whereTypeGrinding = {};
        let whereProductGrame = {};
        whereProductGrame.price = { [Op.gt]: 0,}
        //whereTypeGrinding.active = true ;

        if(idCategories.length > 0){
            whereTypeGrinding.id = { [Op.in]: idCategories };
        }
        if(grames.length > 0){
            whereProductGrame.grames = { [Op.in]: grames };            
        }
        
        let typeGrindings = db.TypeGrinding.findAll();
        let products = db.Product.findAll(
            {include: [
                {model: db.TypeGrinding, as: "type_grindings", where: whereTypeGrinding, through: { where: {active:true}}},
                {model: db.ProductGrame, as: "products_grames", where: whereProductGrame},
                {model: db.ImageProduct, as: "images_products" }, 
                {association : "brands"}
            ], where: {active:true} })

        Promise.all([products, typeGrindings])
        .then(([products, typeGrindings]) => {
            //res.send(products)
            res.render(path.resolve(__dirname, "../views/product/list.ejs"), { products: products, typeGrindings: typeGrindings })
        })

    },

    adminProducts: (_req, res) => {

        db.Product.findAll( {
            include: [
                {model: db.TypeGrinding, as: "type_grindings"},
                {model: db.ProductGrame, as: "products_grames" },
                {model: db.ImageProduct, as: "images_products" }, 
                {association : "brands"}
            ],where: {active: true}})
            .then(allProducts => {
                //res.send(allProducts)
                res.render((path.resolve(__dirname, "../views/product/adminProduct.ejs")), { allProducts: allProducts })
            })

    },

    // Crea un Producto - Muestra el FORMULARIO - LISTO

    create: (_req, res) => {

        let allBrands = db.Brand.findAll()
        let typeGrindings = db.TypeGrinding.findAll()

        Promise.all([allBrands, typeGrindings])
            .then(([allBrands, typeGrindings]) => {
                res.render(path.resolve(__dirname, "../views/product/create.ejs"), { brands: allBrands, typeGrindings: typeGrindings })
            })

    },

    // Crea un Producto - Lo crea literalmente - LISTO

    store: (req, res) => {

        let imageNewProduct = function (reqFile){
            let imageProduct = ""
            if (reqFile == undefined){
                imageProduct = "default-product-image.png";
            } else {
                imageProduct = reqFile.filename;
            }
            return imageProduct;
        }

        let nameProduct = req.body.nameProduct
        let weightProduct1 = req.body.weightProduct1
        let priceProduct1 = req.body.priceProduct1
        let weightProduct2 = req.body.weightProduct2
        let priceProduct2 = req.body.priceProduct2
        let weightProduct3 = req.body.weightProduct3
        let priceProduct3 = req.body.priceProduct3

        // let idCategories = req.body.idCategories // El atibuto VALUE es el que trae los datos, si no se pone trae "ON"
        let categories = req.body.idCategories ? req.body.idCategories : [];
        let idCategories = Array.isArray(categories) ?  categories : [categories];

        let ratingProduct = req.body.ratingProduct
        let idBrand = req.body.idBrand
        let descriptionProduct = req.body.descriptionProduct

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            // Seguimos para adelante

            db.Product.create({
                name: nameProduct,
                rating: ratingProduct,
                description: descriptionProduct,
                brand_id: idBrand
    
            }) .then(product => {
                db.ProductGrame.create({
                    product_id: product.id, // Este id viene del objeto de arriba recien creado.
                    grames: weightProduct1,
                    price: priceProduct1,
                })
                db.ProductGrame.create({
                    product_id: product.id,
                    grames: weightProduct2,
                    price: priceProduct2,
                })
                db.ProductGrame.create({
                    product_id: product.id,
                    grames: weightProduct3,
                    price: priceProduct3,
                })
                
               if (idCategories.length == 1) {
    
                   db.ProductTypeGrinding.create({
                       product_id: product.id,
                       type_grinding_id: idCategories
                   })
                    
                } else {
                    
                    idCategories.forEach(idCategory => {
                        db.ProductTypeGrinding.create({
                            product_id: product.id,
                            type_grinding_id: idCategory
                        })
                    })
                    
                }
    
                db.ImageProduct.create({
                    path: imageNewProduct(req.file),
                    product_id: product.id,
                })           
            })

            res.redirect('/product');

        } else {

            // Volvemos a la vista con los errores
            
            let allBrands = db.Brand.findAll()
            let typeGrindings = db.TypeGrinding.findAll()

            Promise.all([allBrands, typeGrindings])
                .then(([allBrands, typeGrindings]) => {
                    res.render(path.resolve(__dirname, "../views/product/create.ejs"), { brands: allBrands, typeGrindings: typeGrindings, errors: errors.mapped(), oldData: req.body, idCategoriesArray: idCategories })
                })
        }

    },

    // Edita un Producto - Muestra el FORMULARIO - LISTO

    edit: (req, res) => {

        let id = req.params.id;

        let pedidoProducto = db.Product.findByPk(id, {
            include: [
                {association: "type_grindings"},
                {association: "brands"},
                {association: "images_products"},
                {association: "products_grames"}
            ]
        })

        let allTProductGrame = db.ProductGrame.findAll()

        let allTypeGrindings = db.TypeGrinding.findAll()

        let allBrands = db.Brand.findAll()

        Promise.all([pedidoProducto, allBrands, allTypeGrindings, allTProductGrame])
            .then(([pedidoProducto, allBrands, allTypeGrindings, allTProductGrame]) => {
                //res.send(pedidoProducto)
                res.render(path.resolve(__dirname, "../views/product/edit.ejs"), { product: pedidoProducto , allBrands: allBrands, allTypeGrindings: allTypeGrindings, allProductGrame: allTProductGrame })
            })

    },


    // Edita un Producto - Lo Edita literalmente - LISTO

    update: (req, res) => {

        let id = req.params.id
        let nameProduct = req.body.nameProduct

        let priceProducts = req.body.priceProduct;
        let weightProducts = req.body.weightProduct;

        // Es el req.body.idCategories que utilizo en idCategories para no ser tan repetitivo
        // El atibuto VALUE es el que trae los datos, si no se pone trae "ON"
        // If ternario donde si trae un solo dato lo convierte en array y sino lo trae como array.
        // If ternario: Condicion ? Si se cumple : Sino esto
        let categories = req.body.idCategories ? req.body.idCategories : [];
        let idCategories = Array.isArray(categories) ?  categories : [categories];

        console.log("================================")
        
        let ratingProduct = req.body.ratingProduct
        let idBrand = req.body.idBrand
        let descriptionProduct = req.body.descriptionProduct  
        var allPricesZero = true;
            
        db.Product.findByPk(id)            
            .then(product => {
                db.Product.update({
                    name: nameProduct,
                    rating: ratingProduct,
                    description: descriptionProduct,
                    brand_id: idBrand
                },{
                    where: {
                        id: product.id
                    }                    
                })

                priceProducts.forEach((priceProduct, index) => {
                    if(!priceProduct) { return; };
                    
                    db.ProductGrame.update({
                        product_id: product.id,
                        grames: weightProducts[index],
                        price: priceProduct,
                    }, {
                        where: {
                            grames: weightProducts[index],
                            product_id: product.id
                        }
                    })

                    if(priceProduct == 0){ //vaciar en carrito
                        db.ProductGrame.findOne({                         
                            where: {
                                grames: weightProducts[index],
                                product_id: product.id
                            }
                        }).then((productGrame) => { 
                            db.DetailCart.destroy({
                                where : {product_grame_id: productGrame.id}
                            })
                        })
                    }else{
                        allPricesZero = false;
                    }
                    
                })               
              
                if (req.file) {

                    db.ImageProduct.update({
                        path: req.file.filename,
                    },{
                        where: {
                            product_id: product.id
                        }
                    })

                }

                /***************  BEGIN ProductTypeGrinding ******************/

               
              
                //ver cuales desactivar (traer todos los que ya no estan en el listado de idCategorias) )
                let toDisabled = db.ProductTypeGrinding.findAll({                    
                    where: {
                        product_id: product.id,
                        active: true,
                        type_grinding_id: {
                            [Op.notIn]: idCategories
                        }
                        
                    }
                })

                Promise.all([toDisabled]).then(([toDisabled]) => {

                    toDisabled.forEach(productTypeGrinding => {
                        db.ProductTypeGrinding.update({
                            active: false,
                        },{where : {id: productTypeGrinding.id}})

                        //vaciar los carritos que usen esta categoria
                        db.DetailCart.destroy({
                            where : {product_type_grinding_id: productTypeGrinding}
                        })
                    })

                    idCategories.forEach(idCategory => {
                        db.ProductTypeGrinding.findOne({ 
                            where: { 
                                product_id:product.id, 
                                type_grinding_id: idCategory
                            }
                        }).then((productTypeGrinding) => {
                            //si el registro existe se actualiza, sino se crea
                            if(productTypeGrinding){
                                db.ProductTypeGrinding.update({
                                    active: true,
                                },{where : {id: productTypeGrinding.id}})
                            }else{
                                db.ProductTypeGrinding.create({
                                    product_id: product.id,
                                    type_grinding_id: idCategory
                                })
                            }
                        })
                    })                 
                }) 
                    
            });
            /***************  END ProductTypeGrinding ******************/

        sleep(1000).then(() => {
            db.ProductTypeGrinding.findOne({ 
                where: { 
                    product_id:id, 
                    active: true
                }
            }).then((productTypeGrindingActive) => {
                if(allPricesZero || !productTypeGrindingActive){
                    db.Product.update({
                       active: false,
                    },{
                        where: {
                            id: id
                        }                    
                    }).then(() => {
                        res.redirect("/product/list");
                    })
                }else{
                    res.redirect("/product/edit/" + id);
                }
            })
        });
    },

    detail: (req, res) => {

        let id = req.params.id;

        let detailProduct = db.Product.findByPk(id, {
            include: [
                {association: "type_grindings"},
                {association: "brands"},
                {association: "images_products"},
                {association: "products_grames"}
            ]
        })

        Promise.all([detailProduct])
            .then(([detailProduct]) => {

                let prices = detailProduct.products_grames.map((productGrame) =>{
                    return productGrame.price > 0 ? productGrame.price : false;
                }).filter((price) => { return price})

                let minorPrice = parseFloat(Math.min.apply(null, prices)).toFixed(2);
                //res.send(detailProduct)
                res.render(path.resolve(__dirname, "../views/product/productNew"), { product: detailProduct, minorPrice: minorPrice })
            })
    },

    // Elimina un Producto - LISTO

    destroy: (req, res) => {
        id = req.params.id;

        db.Product.update({
            active: false
        },{
            where: {
                id: id
            }
        }).then((product) => {
            res.redirect("/product/list");
        })
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = productController;

