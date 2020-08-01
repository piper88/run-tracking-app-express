'use strict';

const debug = require('debug')('run:error-handling');

const createError = require('http-errors');

module.exports = function(err, req, res, next) {
  debug('error handling middleware');
  if (err.status) {
    debug('user error');
    res.status(err.status);
    res.json(err.message);
    next();
    return;
  }
  debug('server error');
  throw createError(500, err.message);
  // return;
};
