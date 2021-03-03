const bcrypt = require('bcryptjs');
const debug = require('debug')('run:hash-pass.js')

const hashPass = (password) => {
  debug('hashPass');
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function(err, hashedPassword) {
      if (err) {
        return reject(createError(400, 'Invalid user information'));
      }
      debug(`hashedPassword ${hashedPassword}`)
      return resolve(hashedPassword);
    });
  })
}

module.exports = hashPass;
