let express = require('express');
let lodash = require('lodash');
let router = express.Router();

let Query = require('../database-query');

/* GET home page. */
router.get('/', function(req, res, next) {
	// Content-type: application/json ?
	// validate req.query.number 
	let result = fibonacci(req.query.number);
	Query.create({ ip: req.connection.remoteAddress,  source: req.query.number, "result": result});
    res.send(JSON.stringify({"result": result}));
});

let fibonacci = lodash.memoize(function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

module.exports = router;
