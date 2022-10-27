module.exports = (sequelize, dataTypes) => {

    let alias = "TypeGrinding"

    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false // Esto no deberia poder ser nulo en la Base de datos.
        }

    }

    let config = {
        tableName: "type_grindings",
        timestamps: false
    }

    const TypeGrinding = sequelize.define (alias, cols, config)

    // Asociaciones

    TypeGrinding.associate = (models) => {

        TypeGrinding.belongsToMany(models.Product, { // Tabla con la que se va a RELACIONAR
            as: "products",
            through: models.ProductTypeGrinding, // Tabla INTERMEDIA
            foreignKey: "type_grinding_id",
            otherKey: "product_id",
            timestamps: false
        })

    }

    return TypeGrinding;
    
}