//exports a function that takes req, res, and next, and calls next at end

const Router = require('express').Router;
const debug = require('debug')('run:run-router');
const parseJSON = require('body-parser').json();
const RunModel = require('../model/run.js');
const mongoose = require('mongoose');
const createError = require('http-errors');
const moment = require('moment');
const runRouter = new Router();



module.exports = runRouter;

runRouter.get('/api/run/:date', async function (req, res, next) {
  debug('route GET /api/run/:date');
  console.log('hey lady');
  req.params.date = moment(req.params.date).format('MMMM Do, YYYY');
    //not finding a document specified in search will not throw an error.
    let run = await RunModel.findOne({date: req.params.date});
    if (run)  {
      //rse.json identical to res.send when what's passed in is object or array, but res.json will also convert non objects (e.g. null and undefined)
      res.json(run);
      return;
    }
    let err = createError(404, 'run not found');
    next(err);
  });



runRouter.post('/api/run', parseJSON, function (req, res, next) {
  debug('route POST /api/run');
  let formattedDate;
  let run;
  switch (req.body.date) {
    case 'today':
      formattedDate = moment(Date.now()).format('MMMM Do, YYYY');
      run = new RunModel({date: formattedDate, distance: req.body.distance, pace: req.body.pace});
      break;
    //if date missing from request
    case undefined:
      run = new RunModel({date: req.body.date, distance: req.body.distance, pace: req.body.pace});
      break;
    //if date in request is in a normal format
    default:
      formattedDate = moment(req.body.date).format('MMMM Do, YYYY');
      run = new RunModel({date: formattedDate, distance: req.body.distance, pace: req.body.pace});
  }
  run.save()
  .then(doc => {
    res.json(doc);
  })
  .catch(err => {
    next(err)
  })
});

runRouter.delete('/api/run/:date', function (req, res, next) {
  debug('route DELETE /api/run/:date');
  if (req.params.date === 'today') {
    req.params.date = moment(Date.now()).format('MMMM Do, YYYY');
  } else {
    req.params.date = moment(req.params.date).format('MMMM Do, YYYY');
  }
  RunModel.deleteOne({date: req.params.date})
  .then((result) => {
    if (result.deletedCount == 0) {
      let err = createError(404, 'run not found');
      next(err);
      return;
    }
    res.sendStatus(204);
  })
  .catch(err => {
    next(err);
  })
})

runRouter.put('/api/run/:date', parseJSON, async function(req, res, next) {
  debug('route PUT /api/run/:date');
  //checks for missing request body
  if (Object.keys(req.body).length == 0) {
    let err = createError(400, 'must update at least one field');
    next(err);
    return;
  }
  //changes date to format that exists in db
  if (req.params.date === 'today') {
    req.params.date = moment(Date.now()).format('MMMM Do, YYYY');
  } else {
    req.params.date = moment(req.params.date).format('MMMM Do, YYYY');
  }
  let filter = {date: req.params.date};
  let update = {date: req.body.date, distance: req.body.distance, pace: req.body.pace}
  RunModel.findOneAndUpdate(filter, update, {new: true})
  .then((result) => {
    if (!result) {
      let err = createError(404, 'run not found');
      next(err);
      return;
    }
    res.json(result);
  })
  .catch(err => {
    next(err);
  })
})
