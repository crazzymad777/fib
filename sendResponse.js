/**
 * converts given object to JSON and send it to client.
 * @param response
 * @param object
 */

module.exports = (response, object) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(object));
};
