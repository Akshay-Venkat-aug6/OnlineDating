const Block = require('../../model/Block');
const User = require('../../model/User');
const Like = require('../../model/Like');
const Image = require('../../model/Images');

module.exports = {
  async renderBlockList(req, res){
    const user = req.user;
    // Notifcation
    

    const blockDetails = await Block.findAll({ where : { userid: user.id}});
    let blockData = [];
    for(var i = 0; i < blockDetails.length ; i++){
      let userDetails = await User.findOne({ where: { id: blockDetails[i].dataValues.userid}});
      blockData.push(userDetails.dataValues);
    }
    console.log(blockData)
    res.render('block', {
      blockData: blockData
    });
  }
}