/**
 * Converts given object to JSON and send it to client.
 * @param {object} response - where to send response
 * @param {object} object - object to return frontend
 */

module.exports.sendResponse = (response, object) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(object));
};

/**
 * Check value is integer.
 * @param {*} value - value to be checked
 * @returns {boolean} - true if value is integer
 */

module.exports.isInteger = (value) => {
  const x = parseFloat(value);
  // eslint-disable-next-line no-restricted-globals,no-bitwise
  return !isNaN(value) && (x | 0) === x;
};

const lodash = require('lodash');

/**
 * @function fibonacci
 * @description Calculate fibonacci number with given index.
 * @param {number} index - index number
 * @returns {number} Fibonacci number
 * @throws {RangeError} RangeError if maximum call stack size exceeded.
 */

const fibonacci = lodash.memoize((n) => (n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)));

module.exports.fibonacci = fibonacci;
