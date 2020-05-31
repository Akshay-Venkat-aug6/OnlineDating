const express = require('express');
const usercontroller = require('../../controller/apicontroller/userapicontroller');
const authentication = require('../../middlewares/Authorization');

const router = express.Router();

router.post('/register', usercontroller.registerUser);

router.post('/login', usercontroller.login);

router.post('/logout', authentication , usercontroller.logout);

module.exports = router