'use strict';

const debug = require('debug')('run:error-handling');

const createError = require('http-errors');

module.exports = function(err, req, res, next) {
  debug('error handling middleware');
  if (err.name === 'ValidationError') {
    let errorMessages = '';
    for (const prop in err.errors) {
      errorMessages += `${err.errors[prop].message}\n`;
    }
    err = createError(403, errorMessages);
    // console.log(err);
    res.status(err.status).send(err);
    // res.json(err.name)
  }
};
