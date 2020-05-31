const Sequelize = require('sequelize');
const sequelize = require('../db/psql');

const User = sequelize.define('user', {
  id:{
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  username:{
    type: Sequelize.STRING,
    allowNull: false
  },
  email:{
    type: Sequelize.STRING,
    unique: true
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
  },
  token:{
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = User