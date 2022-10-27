'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  
    static associate(models) {
      this.belongsTo(models.User,{
        as: "users",
        foreignKey: "user_id"
      }),
      this.belongsToMany(models.ProductGrame,{
        as: "products_grames",
        through: models.DetailSale,
        foreignKey: "sale_id",
        timestamps: false
      }),
      this.belongsTo(models.Direction,{
        as: "directions",
        foreignKey: "direction_id"
      })
    }
  }
 
  Sale.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: { 
      type: DataTypes.DATE
    },
  }, 
  {
    sequelize,
    modelName: 'Sale',
    tableName: 'sales',
    timestamps: false
  });

  return Sale;
};