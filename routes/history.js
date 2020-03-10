var express = require('express');
var router = express.Router();

let Query = require('../database-query');

router.get('/', function(req, res, next) {
  Query.findAll().then(queries => {
  	res.send(JSON.stringify({"response": queries}));
  });
});

module.exports = router;
