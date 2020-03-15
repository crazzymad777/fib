const express = require('express');

const router = express.Router();

const Query = require('../database-query');

const { sendResponse } = require('../helpful-functions');

router.get('/', (req, res) => {
  // validate offset and limit
  const offset = Number(req.query.offset || req.body.offset || 0);
  const limit = Number(req.query.limit || req.body.limit || 10);

  Query.findAndCountAll({ offset, limit }).then((queries) => {
    sendResponse(res, { response: queries });
  });
});

module.exports = router;
