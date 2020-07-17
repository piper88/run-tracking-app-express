//exports a function that takes req, res, and next, and calls next at end

const Router = require('express').Router;
const debug = require('debug')('run:run-router');

const runRouter = new Router();

const storage = require('../lib/storage.js');

module.exports = exports = runRouter;


runRouter.get('/api/run/:date', function (req, res, next) {
  debug('route GET /api/run');
  storage.fetchItem(req.params.date)
    .then(run => {
      res.json(run);
    })
    .catch(err => {
      next(err);
    });
});
