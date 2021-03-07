const UserModel = require('../../model/user');
const mongoose = require('mongoose');
const debug = require('debug')('run: user-mock')
//sign up fake user
const userMock = async (done) => {
  debug('user mock');

  let exampleUser = {
    email: 'example55@hotmail.com',
  }
  let examplePass = 'password47';

  let user = new UserModel({email: exampleUser.email})

  try {
    user.password = await user.generatePasswordHash(examplePass);
    //set hashedPassword on exampleUser object, so it can accessed via the test file
    exampleUser.password = user.password
    let doc = await user.save();
    debug(doc)
    done();
  } catch(err) {
    done(err);
  }
};

module.exports = userMock;
