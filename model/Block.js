const Sequelize = require('sequelize');
const sequelize = require('../db/psql');

const Block = sequelize.define('block', {
  id:{
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  userid:{
    type: Sequelize.STRING,
    allowNull: false
  },
  blockedUserid:{
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = Block