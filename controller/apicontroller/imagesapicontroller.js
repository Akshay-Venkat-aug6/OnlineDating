const cloudinary = require('../../utils/cloudinary');
const convertBufferToString = require('../../utils/converttoString');
const uuid = require('uuid').v4;
const Image = require('../../model/Images');


module.exports = {
  async uploadImage(req, res, next){
    try {
      const user = req.user;
      console.log(req)
      console.log("COn: "+ req.file)
      console.log(req.body)
      var imageContent = convertBufferToString(req.file.originalname, req.file.buffer);
      const url = await cloudinary.uploader.upload(imageContent)
      console.log(url)
      const imageDetails = {
        id: uuid(),
        userid: user.id,
        publicid: url.public_id,
        imageUrl: url.url
      }
      let { id, userid, publicid, imageUrl } = imageDetails
      await Image.create({ 
        id: id,
        userid: userid,
        publicid: publicid,
        imageUrl: imageUrl
      });
      console.log("Image Uploaded")
      // res.json({ message: "Image Uploaded Successfully"}).status(200)
      res.redirect('/')
    } catch (error) {
      console.log(error)
    }
  }
}