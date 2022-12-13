'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

/* ESTO CONECTA LA BASE DE DATOS */

// lEEMOS VARIABLES GLOBALES.
require("dotenv").config()


const config = require(__dirname + '/../config/config.js')[env];

let sequelize;

//CONECTAMOS CON EL OBJETO QUE TENEMOS EN DATABASE, CONFIG.

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/* FIN DE ESTO CONECTA LA BASE DE DATOS */


/* CONECTANDO CON EL SERVICIO DE RAYWAL.APP, SOLO CON LA URL */
// const sequelize = new Sequelize(process.env.MYSQL_URL)

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
