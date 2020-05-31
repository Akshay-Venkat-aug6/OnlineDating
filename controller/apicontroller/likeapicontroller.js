const Like = require('../../model/Like');
const Image = require('../../model/Images');
const uuid = require('uuid').v4;

module.exports = {
  async likeUrl(req, res){
    const user = req.user;
    const imageid = req.params.postid;
    const postedBy = req.params.postedBy;
    const likeImage = await Like.findOne({ where : { userid : user.id, imageid: imageid, type: "like"}})
    if(!likeImage){
      let likeDetails = {
        userid: user.id,
        type: "like",
        imageid: imageid,
        postedBy: postedBy
      };

      await Like.create({
        id: uuid(),
        userid: likeDetails.userid,
        type: likeDetails.type,
        imageid: likeDetails.imageid,
        postedBy: likeDetails.postedBy
      });
      res.redirect('/')
    }
  },

  async superLike(req, res){
    try {
      const user = req.user;
    const imageid = req.params.postid;
    const postedBy = req.params.postedBy;
    const likeImage = await Like.findOne({ where : { userid : user.id, imageid: imageid, type: "superlike"}})
    if(!likeImage){
      let likeDetails = {
        userid: user.id,
        type: "superlike",
        imageid: imageid,
        postedBy: postedBy
      };
      await Like.create({
        id: uuid(),
        userid: likeDetails.userid,
        type: likeDetails.type,
        imageid: likeDetails.imageid,
        postedBy: likeDetails.postedBy
      });
      
    } 
    res.redirect('/') 
    } catch (error) {
     console.log(error) 
    }
    
  }
}