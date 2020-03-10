const express = require('express');
const lodash = require('lodash');

const router = express.Router();

const Query = require('../database-query');

const fibonacci = lodash.memoize((n) => (n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)));

router.all('/', (req, res) => {
  // Content-type: application/json ?
  // validate req.query.number
  const number = req.query.number || req.body.number;
  const result = fibonacci(number);
  Query.create({ ip: req.connection.remoteAddress, source: number, result });
  res.send(JSON.stringify({ result }));
});

module.exports = router;
