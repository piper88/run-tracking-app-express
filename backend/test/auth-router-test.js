'use strict';

const request = require('superagent');
const UserModel = require('../model/user.js');
const expect = require('chai').expect;

require('../server.js');

describe('testing auth routes', function() {
  let user = {
    email: 'piper85@gmail.com',
    password: '123abc',
  };

  describe('testing POST /api/signup', function() {
    describe('with valid user credentials', function() {
      it('should return a user', function(done) {
        request.post('localhost:3000/api/signup')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.email).to.equal('piper85@gmail.com');
          done();
        })
      });
    })
    // describe('with missing email', function() {
    //   it('should return a 403 error', function(done) {
    //     request.post('localhost:3000/api/signup')
    //     .send({
    //       password: 'passwort',
    //     })
    //     .end((err, res) => {
    //       expect(res.body.message).to.equal('Email required\n');
    //       expect(res.status).to.equal(403);
    //       done();
    //     })
    //   })
    // })
    // describe('with missing password', function() {
    //   it('should return a 403 error', function(done) {
    //     request.post('localhost:3000/api/signup')
    //     .send({
    //       email: 'nick@nick.com',
    //     })
    //     .end((err, res) => {
    //       expect(res.body.message).to.equal('Please enter password\n');
    //       expect(res.status).to.equal(403);
    //       done();
    //     })
    //   })
    // })
  })

  // describe('testing POST /api/login', function() {
  //   describe('with valid user credentials', function() {
  //     it('should return a token', function(done) {
  //       request.post('localhost:3000/api/login')
  //       .send({
  //         email: 'piper85@gmail.com',
  //         password: '123abc'
  //       })
  //       .end((err, res) => {
  //         if(err) return done(err);
  //         expect(res.body.message).to.equal('User successfully logged in!');
  //         done();
  //       })
  //     })
  //   })
  // })
})
