//exports a function that takes req, res, and next, and calls next at end

const Router = require('express').Router;
const debug = require('debug')('run:run-router');
const parseJSON = require('body-parser').json();
const Run = require('../model/run.js');

const runRouter = new Router();

const storage = require('../lib/storage.js');

module.exports = runRouter;

runRouter.get('/api/run/:date', async function (req, res, next) {
  debug('route GET /api/run/:date');
  try {
    const run = await storage.fetchItem(req.params.date);
    res.json(run);
  } catch(err) {
    debug('runRouter get catch')
    next(err);
  }
});

runRouter.post('/api/run', parseJSON, async function (req, res, next) {
  debug('route POST /api/run');
  try {
    let run = await new Run(req.body.date, req.body.distance, req.body.pace);
    await storage.createItem(run);
    res.json(run);
  } catch(err) {
    next(err);
  }
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
