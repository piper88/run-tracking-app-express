'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = Promise.promisifyAll(require('mkdirp'));

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
    //transform data from buffer into JSON
    let run = data.toString();
    return run;
  })
  //send error back to the run-router, who will then send the response to the client that there was an error
  .catch((err) => {
    return Promise.reject(createError(404, err.message));
  });
};
