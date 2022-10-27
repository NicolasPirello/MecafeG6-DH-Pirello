const db = require('../../../database/models');
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const path = require('path');

let apisController = {

    totalProducts: (req, res) => {

        let totalProductsActives = db.Product.count({where: { active: true }});
        let totalProductsDisabled = db.Product.count({where: { active: false }});

        Promise.all([totalProductsActives, totalProductsDisabled]).then(([totalProductsActives, totalProductsDisabled]) => {
            return res.status(200).json({totalProductsActives: totalProductsActives, totalProductsDisabled:totalProductsDisabled });
        })
    },
    totalUsers: (req, res) => {
        let totalUsers = db.User.count();

        Promise.all([totalUsers]).then(([totalUsers]) => {
            return res.status(200).json({totalUsers: totalUsers });
        })
    },
    totalTypeGrindings: (req, res) => {
        let totalTypeGrindings = db.ProductTypeGrinding.count();

        Promise.all([totalTypeGrindings]).then(([totalTypeGrindings]) => {
            return res.status(200).json({totalTypeGrindings: totalTypeGrindings });
        })
    },
    totalRolesUser: (req, res) => {
        let totalRoles = db.Role.count();

        Promise.all([totalRoles]).then(([totalRoles]) => {
            return res.status(200).json({totalRoles: totalRoles });
        })
    },
    totalProductGrames:(req, res) => {
        db.ProductGrame.findAll(
            {
                where: {
                    price:{ [Op.gt]: 0} //mayor a cero

                },
                attributes: ['grames', [sequelize.fn('count', sequelize.col('*')), 'products']],
                group: ['grames']
            }).then(result => {
                return res.status(200).json(result);
            })
    },
    totalProductsTypeGrinding:(req, res) => {
        db.TypeGrinding.findAll({  
            include: [
                {
                  model: db.Product,
                  as: "products",
                  through: {where:{active:true},attributes:[]},
                  attributes: [[sequelize.fn('count', sequelize.col('*')), 'totalProducts']],
                },],
                group:['id']
        }).then(result => {
            return res.status(200).json(result);
        })
    },
    lastProductCreated:(req, res) => {
        db.Product.findOne({
            where: {active: true},
            include: [
                {model: db.TypeGrinding, as: "type_grindings",through: {where:{active:true},attributes:[]}},
                {association: "brands"},
                {association: "images_products"},
                {model: db.ProductGrame, as: "products_grames",where:{price: { [Op.gt]: 0}}}
            ]
            ,order: [['id', 'desc']]
        }).then(result => {
            return res.status(200).json(result);
        })
    },
    lastUserCreated:(req, res) => {
        db.User.findOne({
            include: [
                {association: "roles"},
                {model: db.Direction, as: "directions",where:{active: true}, required: false}
            ]
            ,order: [['id', 'desc']]
        }).then(result => {
            return res.status(200).json(result);
        })
    },
    productsActives:(req, res) => {
        db.Product.findAll({
            where: {active: true},
            include: [
                {model: db.TypeGrinding, as: "type_grindings",through: {where:{active:true},attributes:[]}},
                {association: "brands"},
                {association: "images_products"},
                {model: db.ProductGrame, as: "products_grames",where:{price: { [Op.gt]: 0}}}
            ]
        }).then(result => {
            return res.status(200).json(result);
        })
    }
}

module.exports = apisController;

