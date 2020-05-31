const Sequelize = require('sequelize');
const sequelize = require('../db/psql');

const Like = sequelize.define('like', {
  id:{
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  userid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageid:{
    type: Sequelize.STRING,
    allowNull: false
  },
  postedBy:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Like