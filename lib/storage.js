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

exports.fetchItem = async function(date) {
  debug('storage.fetchItem')
  if (!date) throw createError(400, 'expected date');
  try {
    const data = await fs.readFileProm(`${__dirname}/../data/run/${date}.json`)
    return JSON.parse(data.toString());
  }
  catch(err) {
    debug('storage.fetchItem catch')
    throw createError(404, err.message)
  }
}

exports.createItem = async function(run) {
  debug('storage.createItem');
  try {
    await fs.writeFileProm(`${__dirname}/../dat/run/${run.date}.json`, JSON.stringify(run));
    return run;
  } catch(err) {
    throw new Error(err);
  }
}


exports.deleteItem = function(date) {
  debug('storage.deleteItem');
  if (!date) return Promise.reject(createError(400, 'expected date'));
  return fs.statProm(`${__dirname}/../data/run/${date}.json`)
  .then(() => {
    debug('file exists');
    return fs.unlinkProm(`${__dirname}/../data/run/${date}.json`)
    .then(() => {
      debug('deleted');
      return;
    })
    .catch(err => {
      debug('not deleted');
      return;
      return Promise.reject(createerror(500, 'internal server error'));
    })
  })
  .catch(err => {
    debug('file does not exist')
    return Promise.reject(createError(404, 'file not found'));
  })
}
