const Router = require('express').Router;
const UserModel = require('../model/user.js');
const parseJSON = require('body-parser').json();
const hashPass = require('../lib/hash-pass.js')
let mongoose = require('mongoose');
const debug = require('debug')('run:auth-router');

const authRouter = new Router();

module.exports = authRouter;

authRouter.post('/api/signup', parseJSON, async (req, res, next) => {
  debug('authRouter post /api/signup');

  try {
    let hashedPass = await hashPass(req.body.password);
    let email = req.body.email;
    let user = new UserModel({email: email, password: hashedPass})
    let doc = await user.save()
    res.json(doc)

  } catch(err) {
    next(err)
  }

})
