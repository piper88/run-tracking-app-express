//exports a function that takes req, res, and next, and calls next at end

const Router = require('express').Router;
const debug = require('debug')('run:run-router');

const runRouter = new Router();

const storage = require('../lib/storage.js');

module.exports = exports = runRouter;


runRouter.get('/api/run', function (req, res, next) {
  debug('route GET /api/run');
  // var err = new Error('please work');
  // next(err);
  storage.fetchItem(req.params.date)
    .then(run => {
      res.json(run);
      // res.writeHead(200, {'Content-Type': 'application/json'});
      // res.end(run);
    })
    .catch(err => {
      console.log('yo');
      //err will either be expected date, in which case, no error status, or....??????
      next(err);
      //error from rejected promise
      // console.error(err);
      // //error sent to client
      // res.writeHead(404, {'Content-Type': 'text/plain'});
      // res.end();
    });
});
