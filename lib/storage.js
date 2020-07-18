'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = Promise.promisifyAll(require('mkdirp'));
const debug = require('debug')('run:storage');

const createError = require('http-errors');

module.exports = exports = {};

exports.createResourceDirectory = function() {
  return mkdirp(`${__dirname}/../data/run`)
  .then(() => {
    console.log('run folder created');
  })
  .catch(err => {
    console.error(err);
  });
};

exports.fetchItem = function(date) {
  // console.log(date);
  if (!date) return Promise.reject(createError(400, 'expected date'));
  return fs.readFileProm(`${__dirname}/../data/run/${date}.json`)
  .then(data => {
    //transform data from buffer into JSON into object
    let run = JSON.parse(data.toString());
    return run;
  })
  //send error back to the run-router, who will then send the response to the client that there was an error
  .catch((err) => {
    return Promise.reject(createError(404, err.message));
  });
};

exports.createItem = function(run) {
  debug('storage.createItem');
  return fs.writeFileProm(`${__dirname}/../data/run/${run.date}.json`, JSON.stringify(run))
  .then(() => {
    return run;
  })
  .catch((err => {
    return Promise.reject(createError(500, 'internal server error'));
  }))
}
