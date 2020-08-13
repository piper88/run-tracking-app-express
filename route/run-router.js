//exports a function that takes req, res, and next, and calls next at end

const Router = require('express').Router;
const debug = require('debug')('run:run-router');
const parseJSON = require('body-parser').json();
const RunModel = require('../model/run.js');
const mongoose = require('mongoose');
const createError = require('http-errors');
const runRouter = new Router();

const storage = require('../lib/storage.js');

module.exports = runRouter;

runRouter.get('/api/run/:date', async function (req, res, next) {
  debug('route GET /api/run/:date');

      //not finding a document specified in search will not throw an error.
    let run = await RunModel.findOne({date: req.params.date});

    if (run)  {
      //rse.json identical to res.send when what's passed in is object or array, but res.json will also convert non objects(e.g. null and undefined)
      res.json(run);
      return;
    }
    let err = createError(404, 'run not found');
    next(err);
  });



runRouter.post('/api/run', parseJSON, function (req, res, next) {
  debug('route POST /api/run');
  let run = new RunModel({date: req.body.date, distance: req.body.distance, pace: req.body.pace});
  run.save()
  .then(doc => {
    res.json(doc);
  })
  .catch(err => {
    next(err)
  })
});

runRouter.delete('/api/run/:date', async function (req, res, next) {
  debug('route DELETE /api/run/:date');
  try {
    await storage.deleteItem(req.params.date);
    res.status(204).send('successfully deleted run');
  } catch(err) {
    debug('catch');
    console.log(err);
    next(err);
  }
})



runRouter.put('/api/run/:date', parseJSON, async function(req, res, next) {
  try {
    let replacementRun = await new Run(req.body.date, req.body.distance, req.body.pace);
    await storage.deleteItem(req.params.date);
    await storage.createItem(replacementRun)
    res.json(replacementRun);
  } catch(err) {
    next(err);
  }
})
