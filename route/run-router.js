//exports a function that takes req, res, and next, and calls next at end

const Router = require('express').Router;
const debug = require('debug')('run:run-router');
const parseJSON = require('body-parser').json();
const Run = require('../model/run.js');

const runRouter = new Router();

const storage = require('../lib/storage.js');

module.exports = runRouter;


runRouter.get('/api/run/:date', function (req, res, next) {
  debug('route GET /api/run/:date');
  storage.fetchItem(req.params.date)
    .then(run => {
      res.json(run);
    })
    .catch(err => {
      next(err);
    });
});

runRouter.post('/api/run', parseJSON, function (req, res, next) {
  debug('route POST /api/run');
  try {
    let run = new Run(req.body.date, req.body.distance, req.body.pace)
    storage.createItem(run)
    .then(run => {
      res.json(run);
    })
    .catch(err => {
      next(err);
    });
  } catch (err) {
      next(err);
  };
});
