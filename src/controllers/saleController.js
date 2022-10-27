const db = require('../../database/models');
const path = require('path');

let saleController = {
    store: function(req, res){
        let userId =  req.session.user.id;
        let idDirection = req.body.idDirection;

        let createSale = db.Sale.create({
            user_id: userId,
            direction_id: idDirection,
            date: Date.now()
        })
        let cart = db.Cart.findOne({where: { user_id: userId }});

        Promise.all([createSale,cart]).then(([sale,cart]) => {

            db.DetailCart.findAll({where: {cart_id: userId}}).then(detailsCart => {
                detailsCart.forEach((item) => {
                    db.DetailSale.create({
                        sale_id: sale.id,
                        product_grame_id: item.product_grame_id,
                        product_type_grinding_id: item.product_type_grinding_id,
                        quantity: item.quantity
                    })
                })

                sleep(1000).then(() => {
                    //vaciar carrito
                    db.DetailCart.destroy({where: {cart_id: cart.id} })


                    sleep(1000).then(() => { 
                        res.redirect('/user/sale'); 
                    })
                })
            })
        })
    
       
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = saleController;
