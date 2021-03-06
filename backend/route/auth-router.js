const Router = require('express').Router;
const UserModel = require('../model/user.js');
const parseJSON = require('body-parser').json();
const bcrypt = require('bcryptjs');
const hashPass = require('../lib/hash-pass.js')
let mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const debug = require('debug')('run:auth-router');

const authRouter = new Router();

module.exports = authRouter;

authRouter.post('/api/signup', parseJSON, async (req, res, next) => {
  debug('authRouter post /api/signup');

  //save the user with just the email so you have access to the user object
  let password = req.body.password;
  delete req.body.password;

  let user = new UserModel({email: req.body.email});

  try {
    password = await user.generatePasswordHash(password)
    user.password = password;
    let doc = await user.save();
    res.json(doc);
  } catch(err) {
    debug(err)
  }
})

//TODO: move logic to controller
//authrouter for logging in
authRouter.post('/api/login', parseJSON, async (req, res, next) => {
  debug('authRouter get /api/login');
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
            message: 'User successfully logged in!',
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

  //if so, check password with bcrypt.compare
    //if passwords match, login user
    //if passwords don't match, return user
  //if no user found, return error
})
