const Sequelize = require('sequelize');
const database = require('../utils/db');
const User = require('./user');

const File = database.define('file', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  origin: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("4", "3", "2", "1", "0"),
    defaultValue: "0"
  }
},{
  modelName: "File"
});

File.belongsTo(User, {
  foreignKey: 'userId',
  as: 'id_user'
})

module.exports = File