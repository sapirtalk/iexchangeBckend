const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const exchangeRate = require('./routes/exchangeRate');
const httpError = require('./models/httpError');

server.use(bodyParser.json());

server.use('/api/exchangerate', exchangeRate);

server.use((req, res, next) => {
	const error = new httpError('could not find route', 404);
	return next(error);
});

server.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'unknown error' });
});

server.listen(5000);
