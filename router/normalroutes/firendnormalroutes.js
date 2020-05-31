const express = require('express');
const { listFriend } = require('../../controller/normalcontroller/friendnormalcontroller')
const authentication  =require('../../middlewares/Authorization');

const router  =express.Router();

router.get('/friend', authentication ,listFriend);

module.exports = router;