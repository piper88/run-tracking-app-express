//exports a function that takes req, res, and next, and calls next at end

const express = require('express');
const Router = express.Router;
const url = require('url');
const querystring = require('querystring');

const runRouter = new Router();

const storage = require('../lib/storage.js');

module.exports = exports = runRouter;

var parseUrl = function(req, res, next) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  next();
};


runRouter.get('/api/run', parseUrl, function (req, res) {
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
