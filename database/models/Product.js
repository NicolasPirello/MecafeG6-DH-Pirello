module.exports = (sequelize, dataTypes) => {

    let alias = "Product"

    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        rating: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING(250)
        },
        brand_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        active: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    // Declaracion de Product con sus definiciones

    const Product = sequelize.define(alias, cols, config)

    // Asociaciones

    Product.associate = (models) => {

        Product.belongsToMany( models.TypeGrinding, { // Tabla con la que se va a RELACIONAR
            as: "type_grindings",
            through: models.ProductTypeGrinding, // Tabla INTERMEDIA
            foreignKey: "product_id",
            otherKey: "type_grinding_id",
            timestamps: false
        })

        // hasmany

        Product.belongsTo (models.Brand, {
            as: "brands",
            foreignKey: "brand_id"
        })

        Product.hasMany (models.ImageProduct, {
            as: "images_products",
            foreignKey: "product_id"
        })

        Product.hasMany(models.ProductGrame,{
            as: "products_grames",
            foreignKey: "product_id"
        })

    }

    return Product;

}
