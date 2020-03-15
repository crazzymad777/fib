const express = require('express');

const router = express.Router();

const Query = require('../database-query');

const { sendResponse, isInteger } = require('../helpful-functions');

router.get('/', (req, res) => {
  const offset = Number(req.query.offset || req.body.offset || 0);
  const limit = Number(req.query.limit || req.body.limit || 10);

  // offset should be positive integer or zero
  if (offset < 0 || !isInteger(offset)) {
    sendResponse(res, { error: { message: 'offset is not positive integer or zero.' } });
    return;
  }

  // limit should be positive integer
  if (limit <= 0 || !isInteger(limit)) {
    sendResponse(res, { error: { message: 'limit is not positive integer.' } });
    return;
  }

  Query.findAndCountAll({ offset, limit }).then((queries) => {
    sendResponse(res, { response: queries });
  });
});

module.exports = router;
