const express = require('express');
const users = require('../controllers/users-controller');
const router = express.Router();

router.post('/login', users.login);

router.post('/signup', users.signUp);

module.exports = router;
