let express = require('express');
let lodash = require('lodash');
let router = express.Router();

let Query = require('../database-query');

router.all('/', function(req, res, next) {
	// Content-type: application/json ?
	// validate req.query.number 
	let number = req.query.number || req.body.number;
	let result = fibonacci(number);
	Query.create({ ip: req.connection.remoteAddress, source: number, "result": result});
    res.send(JSON.stringify({"result": result}));
});

let fibonacci = lodash.memoize(function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

module.exports = router;
