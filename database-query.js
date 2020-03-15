const Sequelize = require('sequelize');
const sequelize = require('./database');

const { Model } = Sequelize;
class Query extends Model {}

// create Query model
Query.init({
  ip: Sequelize.STRING(39),
  timestamp: Sequelize.DATE,
  source: Sequelize.INTEGER.UNSIGNED,
  result: Sequelize.DOUBLE.UNSIGNED,
}, {
  timestamps: false, sequelize, modelName: 'Query', tableName: 'queries',
});
// Sequelize expect `id` field but actually it doesn't exist. Just remove to avoid troubles.
Query.removeAttribute('id');

module.exports = Query;
