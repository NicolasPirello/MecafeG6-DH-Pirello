'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTypeGrinding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  
    static associate(models) {
        this.belongsTo(models.Product,{
          as: 'products',
          foreignKey: 'product_id'
        }),
        this.belongsTo(models.TypeGrinding,{
          as: 'type_grindings',
          foreignKey: 'type_grinding_id'
        }),
        this.hasMany(models.DetailCart,{
            as: "detail_carts",
            foreignKey: "product_type_grinding_id"
        }),
        this.hasMany(models.DetailSale,{
            as: "detail_sales",
            foreignKey: "product_type_grinding_id"
        })
    }
  }
 
  ProductTypeGrinding.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    product_id: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type_grinding_id: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, 
  {
    sequelize,
    modelName: 'ProductTypeGrinding',
    tableName: 'products_type_grindings',
    timestamps: false
  });

  return ProductTypeGrinding;
};