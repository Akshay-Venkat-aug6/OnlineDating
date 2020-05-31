const express = require('express');
const { blockuser } = require('../../controller/apicontroller/blockapicontroller');
const authentication = require('../../middlewares/Authorization');

const router = express.Router();

router.post('/block/:id', authentication ,blockuser);

module.exports = router;