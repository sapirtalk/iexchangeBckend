const express = require('express');
const emailHandler = require('../controllers/emailHandler-controller');
const router = express.Router();

router.post('/', emailHandler.sendEmail);

module.exports = router;
