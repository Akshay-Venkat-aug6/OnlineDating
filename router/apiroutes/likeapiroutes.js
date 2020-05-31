const express = require('express');
const { likeUrl, superLike } = require('../../controller/apicontroller/likeapicontroller');
const authentication = require('../../middlewares/Authorization');

const router = express.Router();

router.post('/like/:postid/:postedBy', authentication,  likeUrl);

router.post('/superlike/:postid/:postedBy', authentication, superLike);

module.exports = router