const createError = require('http-errors');
const express = require('express');

const router = express.Router();

const Query = require('../database-query');

const { sendResponse, isInteger, fibonacci } = require('../helpful-functions');

router.all('/', (req, res, next) => {
  const number = req.query.number || req.body.number;

  if (number === undefined) {
    sendResponse(res, { error: { message: 'missing number argument.' } });
    return;
  }

  if (number <= 0 || !isInteger(number)) {
    sendResponse(res, { error: { message: 'number is not positive integer.' } });
    return;
  }

  let result = 0;
  try {
    result = fibonacci(number);
    if (result === Infinity) {
      sendResponse(res, { error: { message: 'result too big' } });
      return;
    }
  } catch (e) {
    if (e instanceof RangeError) {
      sendResponse(res, { error: { message: 'result too big' } });
      return;
    }
    throw e;
  }

  Query.create({ ip: req.connection.remoteAddress, source: number, result });

  sendResponse(res, { result });
});

module.exports = router;
