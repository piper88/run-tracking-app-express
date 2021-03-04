const bcrypt = require('bcryptjs');
const debug = require('debug')('run:hash-pass.js')
const createError = require('http-errors');

const hashPass = (password) => {
  debug('hashPass');
  return new Promise((resolve, reject) => {
    //if password is missing, resolve null in order to handle error with mongoose validation
    if (!password) resolve(null);
    bcrypt.hash(password, 10, function(err, hashedPassword) {
      if (err) {
        return reject(createError(403, 'Invalid user credentials'));
      }
      debug(`hashedPassword ${hashedPassword}`)
      return resolve(hashedPassword);
    });
  })
}

module.exports = hashPass;
