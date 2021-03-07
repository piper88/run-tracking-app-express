const UserModel = require('../../model/user');
const mongoose = require('mongoose');
const debug = require('debug')('run: user-mock')
//sign up fake user
const userMock = async function (done) {
  debug('user mock');

  let exampleUser = {
    email: 'example55@hotmail.com',
    password: 'password47',
  }
  //save this.tempEmail for use in tests
  this.tempEmail = exampleUser.email;
  this.tempPassword = exampleUser.password

  let user = new UserModel({email: exampleUser.email})

  try {
    user.password = await user.generatePasswordHash(exampleUser.password);
    let doc = await user.save();
    debug(doc)
    done();
  } catch(err) {
    done(err);
  }
};

module.exports = userMock;
