const express = require('express');
const { renderSignup, renderLogin } = require('../../controller/normalcontroller/usernormalcontroller');

const router  =express.Router();

router.get('/signup', renderSignup);

router.get('/login', renderLogin)

module.exports = router;