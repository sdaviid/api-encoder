const Sequelize = require('sequelize');
const config = require('../config.json')
const sequelize = new Sequelize(config.database_schema);

module.exports = sequelize;