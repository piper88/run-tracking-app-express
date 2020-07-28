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
    debug('before')
    const run = await storage.fetchItem(req.params.date);
    debug('after')
    res.json(run);
  } catch(err) {
    debug('runRouter get catch')
    next(err);
  }
  // return storage.fetchItem(req.params.date)
  //   .then(run => {
  //     res.json(run);
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});

runRouter.post('/api/run', parseJSON, function (req, res, next) {
  debug('route POST /api/run');
  let run = new Run(req.body.date, req.body.distance, req.body.pace)
  .then((theRun) => {
    return storage.createItem(theRun)
    .then(newRun => {
      res.json(newRun);
    })
    .catch(err => {
      next(err);
    })
  })
  .catch (err => {
    next(err);
  })
})

runRouter.delete('/api/run/:date', function (req, res, next) {
  debug('route DELETE /api/run/:date');
  return storage.deleteItem(req.params.date)
  .then(() => {
    debug('then after storage.deleteItem');
    res.status(204);
    res.send('successfully deleted run');
  })
  .catch(err => {
    next(err);
  })
})

runRouter.put('/api/run/:date', parseJSON, function(req, res, next) {
  let replacementRun;
  storage.doesItemExist(req.params.date)
  .then(() => new Run(req.body.date, req.body.distance, req.body.pace))
  .then((theRun) => {
    replacementRun = theRun;
    return storage.deleteItem(req.params.date);
  })
  .then(() => storage.createItem(replacementRun))
  .then(newRun => res.json(newRun))
  .catch(err => next(err));
})
