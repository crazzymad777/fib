var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// Content-type: application/json ?
	// validate req.query.number 
  res.send(JSON.stringify({"result": fibonacci(req.query.number)}));
});

function fibonacci(num, memo) {
  memo = memo || {};

  if (memo[num]) return memo[num];
  if (num <= 1) return 1;

  return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
}

module.exports = router;
