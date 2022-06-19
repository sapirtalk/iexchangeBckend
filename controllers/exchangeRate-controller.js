const httpError = require('../models/httpError');
const request = require('request');

//get the rate of the requested currency
const getExchangeData = (req, res, next) => {
	const from = req.params.base;
	const to = req.params.to;
	const requestURL = `https://api.exchangerate.host/latest?base=${from}&symbols=${to}&places=3`;
	console.log(from);
	request(requestURL).pipe(res);
};

const allData = (req, res, next) => {
	res.json({ DATA });
};

exports.getExchangeData = getExchangeData;
exports.allData = allData;
