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
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  progress: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM("PENDING_DOWNLOAD", "DOWNLOADING", "PENDING_ENCODE", "ENCODING", "DONE"),
    defaultValue: "PENDING_DOWNLOAD"
  }
},{
  modelName: "File"
});

File.belongsTo(User, {
  foreignKey: 'userId',
  as: 'id_user'
})

module.exports = File