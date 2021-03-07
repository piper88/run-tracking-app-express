'use strict';

const request = require('superagent');
const UserModel = require('../model/user.js');
const expect = require('chai').expect;

require('../server.js');

describe('testing auth routes', function() {
  let user = {
    email: 'piper04@gmail.com',
    password: '123abc',
  };

  describe('testing POST /api/signup', function() {
    describe('with valid user credentials', function() {
      it('should return a user', function(done) {
        request.post('localhost:3000/api/signup')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.email).to.equal('piper04@gmail.com');
          done();
        })
      });
    })
    describe('with missing email', function() {
      it('should return a 403 error', function(done) {
        request.post('localhost:3000/api/signup')
        .send({
          password: 'passwort',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Email required\n');
          expect(res.status).to.equal(403);
          done();
        })
      })
    })

    //failing. returning undefined
    // run:auth-controller hit signup controller +100ms
  // run: userModel hashPass +6ms
    describe('with missing password', function() {
      it('should return a 403 error', function(done) {
        request.post('localhost:3000/api/signup')
        .send({
          email: 'nick@nick.com',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Invalid user credentials');
          expect(res.status).to.equal(403);
          done();
        })
      })
    })
  })


  //TODO: Make a user mock file to create fake users that you can then try and login
  describe('testing POST /api/login', function() {
    describe('with valid user credentials', function() {
      it('should return a token', function(done) {
        request.post('localhost:3000/api/login')
        .send({
          email: 'piper04@gmail.com',
          password: '123abc'
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.message).to.equal('User successfully logged in!');
          done();
        })
      })
    })
    describe('with invalid email', function() {
      it('should return the message of user not found', function(done) {
        request.post('localhost:3000/api/login')
        .send({
          email: 'wrong@gmail.com',
          password: 'doesntmatter',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('User not found');
          done();
        })
      })
    })
    describe('with invalid password', function() {
      it('should return the message of Incorrect password', function(done) {
        request.post('localhost:3000/api/login')
        .send({
          email: 'piper04@gmail.com',
          password: 'wrongpassword',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Incorrect password');
          done();
        })
      })
    })
  })
})
