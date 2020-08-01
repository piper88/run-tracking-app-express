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
    debug('storage.fetchItem catch');
    return Promise.reject(createError(404, err.message));
    // throw createError(404, err.message)
  }
}

exports.createItem = async function(run) {
  debug('storage.createItem');
  try {
    await fs.writeFileProm(`${__dirname}/../data/run/${run.date}.json`, JSON.stringify(run));
    return;
  } catch(err) {
    return Promise.reject(err);
  }
}

exports.deleteItem = async function(date) {
  if (!date) throw createError(400, 'expected date');
  try {
    await fs.statProm(`${__dirname}/../data/run/${date}.json`);
    await fs.unlinkProm(`${__dirname}/../data/run/${date}.json`);
  } catch (err) {
    return Promise.reject(createError(404, err.message))
    //same
    // throw createError(404, err.message);
  }
};


// exports.deleteItem = function(date) {
//   debug('storage.deleteItem');
//   if (!date) return Promise.reject(createError(400, 'expected date'));
//   return fs.statProm(`${__dirname}/../data/run/${date}.json`)
//   .then(() => {
//     debug('file exists');
//     return fs.unlinkProm(`${__dirname}/../dat/run/${date}.json`)
//     .then(() => {
//       debug('deleted');
//       return;
//     })
//     .catch(err => {
//       debug('not deleted');
//       console.error(err)
//       Promise.reject(createError(500, 'internal server error'));
//       return;
//     })
//   })
//   //this catch block runs even if catch block above runs....wouldn't rejected the promise exit out of this function and send it back to run router?
//   //if you reject a nested promise within a then block, the catch block will also be executed. In order to bypass this catch when the first catch is executed, have to reject the promise and then return. Can't just return the rejected promise...
//   .catch(err => {
//     debug('file does not exist')
//     // console.error(err);
//     // return err;
//     return Promise.reject(createError(404, 'file not found'));
//   })
// }
