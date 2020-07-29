'use strict';

const debug = require('debug')('run:error-handling');

const createError = require('http-errors');

module.exports = function(err, req, res, next) {
  debug('error handling middleware');
  // console.log(err);
  if (err.status) {
    debug('user error')
    res.status(err.status);
    res.json(err.message);
    next();
    return;
  }
  debug('server error');
  // let error = createError(500, err.message);
  // res.status(error.status)
  // res.send(error.message);
  // next()
  throw createError(500, err.message);
  return;
};
