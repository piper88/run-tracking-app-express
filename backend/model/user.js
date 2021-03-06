const mongoose = require('mongoose');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const debug = require('debug')('run: userModel');

const userSchema = new mongoose.Schema({
  email: {type: String, required: [true, 'Email required']},
  password: {type: String},
  // password: {type: String, required: [true, 'Please enter password']}
});

userSchema.methods.generatePasswordHash = function (password) {
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

      resolve(hashedPassword);
    });
  })
}

module.exports = mongoose.model('User', userSchema);
