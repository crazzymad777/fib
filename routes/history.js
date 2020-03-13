const express = require('express');

const router = express.Router();

const Query = require('../database-query');

router.get('/', (req, res) => {
  Query.findAll().then((queries) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ response: queries }));
  });
});

module.exports = router;
