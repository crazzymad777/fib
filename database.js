const Sequelize = require('sequelize');

// load mysql config
require('custom-env').env();

// initialize orm and export it
const sequelize = new Sequelize(process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
  });

module.exports = sequelize;
