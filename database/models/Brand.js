module.exports = (sequelize, dataTypes) => {

    let alias = "Brand"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }

    let config = {
        tableName: "brands",
        timestamps: false
    }

    // Declaracion de Product con sus definiciones

    const Brand = sequelize.define (alias, cols, config)

    // Asociaciones

    Brand.associate = (models) => {

        Brand.hasMany(models.Product, { // Espero este bien la relacion, la habia hecho al reves y la corregi.
            as: "products",
            foreignKey: "brand_id"
        })

    }

    return Brand;

}
