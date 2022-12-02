require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql"
  }
}


/*
    //"operatorsAliases": false
*/