const Sequelize = require('sequelize');
const config = require('../config.json')
const sequelize = new Sequelize(config.database_schema);
sequelize.sync({ logging: console.log })

module.exports = sequelize;
