const express = require('express');
const { renderBlockList } = require('../../controller/normalcontroller/blocknormalcontroller')
const authentication  =require('../../middlewares/Authorization');

const router  =express.Router();

router.get('/block', authentication , renderBlockList);

module.exports = router;