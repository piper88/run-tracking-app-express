const Router = require('express').Router;
const parseJSON = require('body-parser').json();
const debug = require('debug')('run:auth-router');
const authController = require('../controllers/auth-controller');

const authRouter = new Router();

module.exports = authRouter;

//router for signing up
authRouter.post('/api/signup', parseJSON, authController.signup)
//router for logging in
authRouter.post('/api/login', parseJSON,authController.login);
