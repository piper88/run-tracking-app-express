//exports a function that takes req, res, and next, and calls next at end

const express = require('express');
const router = express.Router();

const storage = require('../lib/storage.js');

module.exports = exports = router;

router.get('/api/run', function (req, res, next) {
  storage.fetchItem(req.url.query.date)
    .then(run => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(run);
    })
    .catch(err => {
      //error from rejected promise
      console.error(err);
      //error sent to client
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end();
    });
});
