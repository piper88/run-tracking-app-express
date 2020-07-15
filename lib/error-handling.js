'use strict';

const debug = require('debug')('run:error-handling');

const createError = require('http-errors');

module.exports = function(err, req, res, next) {
  debug('error handling middleware');

  if (err.status) {
    res.status(err.status);
    res.json(err.message);
    return;
  }
  throw createError(500, err.message);
  // res.status(error.status);
  // res.json(error.message);
  // next();

};
