/**
 * converts given object to JSON and send it to client.
 * @param response
 * @param object
 */

module.exports = (response, object) => {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(object));
};
