const express = require('express');
const emailHandler = require('../controllers/emailHandler-controller');
const router = express.Router();

router.get('/', emailHandler.sendEmail);

module.exports = router;
