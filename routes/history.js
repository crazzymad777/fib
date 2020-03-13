const express = require('express');

const router = express.Router();

const Query = require('../database-query');

const sendResponse = require('../sendResponse');

router.get('/', (req, res) => {
  Query.findAll().then((queries) => {
    sendResponse(res, { response: queries });
  });
});

module.exports = router;
