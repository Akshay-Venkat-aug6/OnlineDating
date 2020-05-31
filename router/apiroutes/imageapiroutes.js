const express = require('express');
const imageapicontroller = require('../../controller/apicontroller/imagesapicontroller');
const Authorization = require('../../middlewares/Authorization');
const upload = require('../../utils/multer');
// const cloudinary = require('../../utils/cloudinary');

const router = express.Router();

router.post('/uploadimages', Authorization, upload.single('image') ,imageapicontroller.uploadImage);

module.exports = router;