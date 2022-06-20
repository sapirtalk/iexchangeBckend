const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const exchangeRate = require('./routes/exchangeRate');
const emailHandler = require('./routes/emailHandler');
const httpError = require('./models/httpError');

// var cors = require('cors');
// server.use(cors());

server.use(bodyParser.json());

server.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With , Content-Type, Accept , Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET , POST, PATCH, DELETE');
	next();
});

server.use('/api/exchangerate', exchangeRate);

server.use('/api/emailhandler', emailHandler);

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

server.listen(process.env.PORT || 5000);
