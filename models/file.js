const Sequelize = require('sequelize');
const database = require('../utils/db');

const File = database.define('file', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.STRING,
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
    type: Sequelize.ENUM("PENDING_DOWNLOAD", "DOWNLOADING", "PENDING_ENCODE", "ENCODING", "DONE", "DELETED"),
    defaultValue: "PENDING_DOWNLOAD"
  }
},{
  modelName: "File"
});



module.exports = File