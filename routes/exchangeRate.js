const express = require('express');
const exchangeRate = require('../controllers/exchangeRate-controller');
const router = express.Router();

router.get('/base=:base/to=:to', exchangeRate.getExchangeData);

router.get('/all/base=:base', exchangeRate.allData);

module.exports = router;
