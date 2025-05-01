'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

// Leemos variables globales
require("dotenv").config();

const config = require(__dirname + '/../config/config.js')[env];

// 👉 Agregamos estas opciones si no estaban
config.dialectOptions = {
  typeCast: true,
  multipleStatements: true
};

config.logging = false;

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 💡 Desactivar ONLY_FULL_GROUP_BY para evitar el error de agrupamiento
sequelize.authenticate()
  .then(async () => {
    console.log('✅ Conectado a MySQL exitosamente');
    await sequelize.query("SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))");
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
