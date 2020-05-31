const Sequelize = require('sequelize');
const sequelize = require('../db/psql');

const Image = sequelize.define('image', {
  id:{
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  userid:{
    type: Sequelize.STRING,
    allowNull: false
  },
  publicid:{
    type: Sequelize.STRING,
    unique: true
  },
  imageUrl:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Image