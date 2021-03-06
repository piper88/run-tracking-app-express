const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserModel = require('../model/user.js');
const debug = require('debug')('run:auth-controller');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  debug('hit signup controller')
  let password = req.body.password;
  delete req.body.password;

  let user = new UserModel({email: req.body.email});

  try {
    password = await user.generatePasswordHash(password)
    user.password = password;
    await user.save();
    //return token as response
    let token = jwt.sign({email: user.email}, 'verySecretValue', {expiresIn: '1h'});
    res.json({
      email: user.email,
      token,
    })
    // res.json(doc);
  } catch(err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  debug('hit login controller');
  //get the email and password from the req.body
  let email = req.body.email;
  let password = req.body.password;
  //check to see if user is found in database
  console.log(`email ${email} password ${password}`)
  UserModel.findOne({email: email}, (err, user) => {
    if (user) {
      //compare password passed in in request, and password save on user schema?
      bcrypt.compare(password, user.password, (err, result) => {
        console.log(`result ${result}`)
        if (err) {
          next(err);
        }
        //result is true if passwords match
        if (result) {
          let token = jwt.sign({email: user.email}, 'verySecretValue', {expiresIn: '1h'});
          res.json({
            email: user.email,
            token,
          })
        } else {
          res.json({
            message: 'Incorrect password',
          })
        }
      })
    } else {
      res.json({
        message: 'User not found',
      })
    }
  })
}

module.exports = { signup, login }
