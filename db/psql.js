// import Sequelize from 'sequelize';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('onlinedating', 'akshay', 'Akshay', 
  {
    host: 'localhost',
    dialect: 'postgres',
  },
);
sequelize.authenticate()
  .then(()=>{
    console.log('Database Connected ......')
  })
  .catch((err)=>{
    console.log('Error: '+ err.messagae)
  })

// export default {
//   sequelizes
// }
module.exports = sequelize;
