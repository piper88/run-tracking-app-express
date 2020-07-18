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
  return storage.fetchItem(req.params.date)
    .then(run => {
      res.json(run);
    })
    .catch(err => {
      next(err);
    });
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
  //this is horrendous
  debug('route PUT /api/run/:date');
  return storage.doesItemExist(req.params.date)
  .then(() => {
    //if it exists, then try to create new one
    let run = new Run(req.body.date, req.body.distance, req.body.pace)
    .then((theRun) => {
      return storage.deleteItem(req.params.date)
      .then(() => {
        return storage.createItem(theRun)
        .then(newRun => {
          res.json(newRun);
        })
        .catch(err => {
          //failed to create
          next(err);
        })
      })
      .catch(err => {
        //failed to delete
        next(err);
      })
    })
    .catch(err => {
      //missing required property of run (failed in new Run)
      next(err);
    })
  })
  //run not found
  .catch(err => {
    next(err);
  })
});
