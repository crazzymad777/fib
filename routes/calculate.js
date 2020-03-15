const express = require('express');

const router = express.Router();

const Query = require('../database-query');

const { sendResponse, isInteger, fibonacci } = require('../helpful-functions');

router.all('/', (req, res) => {
  const number = req.query.number || req.body.number;

  // is number defined?
  if (number === undefined) {
    sendResponse(res, { error: { message: 'Missing number argument.' } });
    return;
  }

  // number should be positive integer
  if (number <= 0 || !isInteger(number)) {
    sendResponse(res, { error: { message: 'Number is not positive integer.' } });
    return;
  }

  let result = 0;
  try {
    // calculate fibonacci number
    result = fibonacci(number);
    if (result === Infinity) {
      sendResponse(res, { error: { message: 'Result too big' } });
      return;
    }
  } catch (e) {
    if (e instanceof RangeError) {
      // Probably maximum call stack size exceeded.
      sendResponse(res, { error: { message: 'Result too big' } });
      return;
    }
    // Unknown exception
    throw e;
  }

  // save result
  Query.create({ ip: req.connection.remoteAddress, source: number, result });

  sendResponse(res, { result });
});

module.exports = router;
