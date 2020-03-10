const Sequelize = require('sequelize');
let sequelize = require('./database');

const Model = Sequelize.Model;
class Query extends Model {}

Query.init({
  ip: Sequelize.STRING(39),
  timestamp: Sequelize.DATE,
  source: Sequelize.INTEGER,
  result: Sequelize.INTEGER
}, { timestamps: false, sequelize, modelName: 'Query', tableName: 'queries'});
Query.removeAttribute('id');

module.exports = Query;
