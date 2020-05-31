const User = require('../../model/User');
const Block = require('../../model/Block');

const sequelize = require('sequelize');

var op = sequelize.Op;

module.exports = {
  async listFriend(req, res){
    const user = req.user;
    const userData = await User.findAll({ where : { id: { [op.ne] : user.id }}})
    let userDetails = [];
    for( var i =0; i < userData.length; i++){
      let blockData = await Block.findOne({ where: { userid: user.id }})
      if(!blockData){
        userDetails.push(userData[i].dataValues);
      }
    }
    res.render('friend', {
      friendData: userDetails
    })
  }
}