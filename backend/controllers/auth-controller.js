const bcrypt = require('bcryptjs');
const debug = require('debug')('run:hash-pass.js')
const createError = require('http-errors');

//not using. Put on userschema instead.
const hashPass = (password) => {
  debug('hashPass');
  return new Promise((resolve, reject) => {
    //if password is missing, resolve null in order to handle error with mongoose validation
    if (!password) resolve(null);
    //the 10 is the salt. Another layer of security. The hashed password is the hash plus the salt. Required so that the same password doesn't result in the same hash. So if two users have the same password, they won't have the same hashed password. If a hacker figures out one password then, they won't automatically have access to all user's hashed passwords that had the same plain text password.
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
