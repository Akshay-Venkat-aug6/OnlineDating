const User = require('../../model/User');
const Image = require('../../model/Images');
const Like = require('../../model/Like');
const Block = require('../../model/Block');

const  sequelize = require('sequelize')


const op = sequelize.Op;
module.exports = {
  async renderHome(req, res){
    try {
      const user = req.user;
      console.log(user)
      const like = await Like.findAll({where: { postedBy: {[op.ne]: user.id}}})
      let notificationdata = [];
      for( var i = 0; i < like.length; i++){
        let posteduser = await Block.findOne({ where : { blockedUserid: like[i].dataValues.postedBy}})
        if(!posteduser){
          // console.log(like[i].dataValues)
          let user = await User.findOne({ where: { id: like[i].dataValues.userid}})
          let name ;
          if(like[i].dataValues.type == 'like'){
            name = 'Someone'
          }
          else{
            name = user.dataValues.username
          }
          let notificationDetails = {
            name: name
          }
          notificationdata.push(notificationDetails)

        }
      }
      var userDetails = [];
      const imageall = await Image.findAll({});
      
      for( var i = 0; i< imageall.length; i++){
        let url = imageall[i].dataValues.imageUrl;
        let publicid = imageall[i].dataValues.publicid;
        // console.log(imageall[i].dataValues.userid.trim()+":No");
        let userid = imageall[i].dataValues.userid
        const userall = await User.findOne({ id: userid})
        // console.log(userall)
        let username = userall.username;
        let userData  = {
          name: username,
          url: url,
          imageid: publicid,
          postedid: imageall[i].dataValues.id
        }
        userDetails.push(userData)
      }
      // console.log(userDetails)
      // console.log(imageall)
      console.log(notificationdata)
      console.log(userDetails);

      res.render('home', {
        userData: userDetails,
        notification: notificationdata,
        notifycount: notificationdata.length
      })  
      // res.render('home')
    } catch (error) {
      console.log(error) 
    }
    
  }
}