const express = require('express');
const users = require('../controllers/users-controller');
const router = express.Router();

router.get('/login', users.login);

router.get('/signup', users.signUp);

module.exports = router;
