module.exports = (sequelize, dataTypes) => {

    let alias = "ImageProduct"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        path: {
            type: dataTypes.STRING
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }   
    }

    let config = {
        tableName: "images_products",
        timestamps: false
    }

    // Declaracion de Product con sus definiciones

    const ImageProduct = sequelize.define (alias, cols, config)

    // Asociaciones

    ImageProduct.associate = (models) => {

        ImageProduct.belongsTo (models.Product, {
            as: "products",
            foreignKey: "product_id"
        })

    }

    return ImageProduct;

}

