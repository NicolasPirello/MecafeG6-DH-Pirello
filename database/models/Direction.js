'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.belongsTo(models.User, {
        as: "users",
        foreignKey: "user_id"
      })
    }
  }

  Direction.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(250)
    },
    region: {
      type: DataTypes.STRING(250)
    },
    country: {
      type: DataTypes.STRING(250)
    },
    address_code: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  },
    {
      sequelize,
      modelName: 'Direction',
      tableName: 'directions',
      timestamps: false
    });

  return Direction;
};