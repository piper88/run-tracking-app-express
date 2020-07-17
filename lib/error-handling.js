'use strict';

const debug = require('debug')('run:error-handling');

const createError = require('http-errors');

module.exports = function(err, req, res, next) {
  debug('error handling middleware');
  console.log(err);
  if (err.status) {
    res.status(err.status);
    res.json(err.message);
    next();
    return;
  }
  console.log('no')
  throw createError(500, err.message);
  // res.status(error.status);
  // res.json(error.message);
  // next();

};
