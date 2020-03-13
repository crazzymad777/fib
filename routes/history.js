const express = require('express');

const router = express.Router();

const Query = require('../database-query');

const sendResponse = require('../sendResponse');

router.get('/', (req, res) => {
  const offset = req.query.offset || req.body.offset || 0;
  const limit = req.query.limit || req.body.limit || 10;

  Query.findAll({ offset, limit }).then((queries) => {
    sendResponse(res, { response: queries });
  });
});

module.exports = router;
