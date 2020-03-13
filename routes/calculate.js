const createError = require('http-errors');
const express = require('express');
const lodash = require('lodash');

const router = express.Router();

const Query = require('../database-query');

const fibonacci = lodash.memoize((n) => (n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)));

const sendResponse = require('../sendResponse');

/**
 * return true if value is integer.
 * @param value
 * @returns {boolean}
 */

function isInteger(value) {
  const x = parseFloat(value);
  // eslint-disable-next-line no-restricted-globals,no-bitwise
  return !isNaN(value) && (x | 0) === x;
}

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
      next(createError(500));
      return;
    }
  } catch (e) {
    if (e instanceof RangeError) {
      next(createError(500));
      return;
    }
    throw e;
  }

  Query.create({ ip: req.connection.remoteAddress, source: number, result });

  sendResponse(res, { result });
});

module.exports = router;
