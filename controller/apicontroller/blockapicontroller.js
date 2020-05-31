const User = require('../../model/User');
const Block = require('../../model/Block');
const uuid = require('uuid').v4;

module.exports = {
  async blockuser(req, res){
    try {
      const friendId = req.params.id;
      const user = req.user;

      const checkFriendID = await User.findOne({ where: { id: friendId}});
      if(!checkFriendID){
        let error = new Error('Invalid Id');
        throw error
      }

      const blockDetails = {
        id: uuid(),
        userid:  user.id,
        blockedUserid: friendId
      }
      let { id, userid, blockedUserid } = blockDetails;

      await Block.create({
        id: id,
        userid: userid,
        blockedUserid: blockedUserid
      })

      res.json({messgae: "You Friend is Blocked Successfully"});
    } catch (error) {
      res.json({messgae: error.messgae});
    }
  }
}