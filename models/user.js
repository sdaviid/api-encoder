const Sequelize = require('sequelize');
const database = require('../utils/db');


 
const User = database.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("1", "0"),
    defaultValue: "0"
  },
},{
  modelName: "User"
});

//const File = require('./file')
//User.hasMany(File, {as: "file"});

module.exports = User;