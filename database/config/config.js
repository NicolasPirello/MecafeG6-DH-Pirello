require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.MYSQL_PORT || 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.MYSQL_PORT || 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.MYSQL_PORT || 3306,
    "dialect": "mysql"
  }
};



/*
    //"operatorsAliases": false
*/