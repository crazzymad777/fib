let express = require('express');
let lodash = require('lodash');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// Content-type: application/json ?
	// validate req.query.number 
  res.send(JSON.stringify({"result": fibonacci(req.query.number)}));
});

let fibonacci = lodash.memoize(function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

module.exports = router;
