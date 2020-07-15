'use strict';

const debug = require('debug')('run:error-handling');

const createError = require('http-errors');

module.exports = (function(err, req, res, next) {

  if (err.status) {
    res.status(err.status);
    res.json(err.name);
    next();
  }

  throw createError(400, err);

  // res.status(err.status);
  // res.json(err.name);
  // next();
  // return;
});
