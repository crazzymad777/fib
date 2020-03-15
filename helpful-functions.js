/**
 * Converts given object to JSON and send it to client.
 * @param {object} response - where to send response
 * @param {object} object - object to return frontend
 */

module.exports.sendResponse = (response, object) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
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
