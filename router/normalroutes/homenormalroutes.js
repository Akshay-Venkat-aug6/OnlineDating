const express = require('express');
const { renderHome } = require('../../controller/normalcontroller/homenormalcontroller')
const authentication  =require('../../middlewares/Authorization');

const router  =express.Router();

router.get('/', authentication ,renderHome);

module.exports = router;