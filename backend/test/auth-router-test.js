'use strict';

const request = require('superagent');
const UserModel = require('../model/user.js');
const expect = require('chai').expect;

require('../server.js');

describe('testing auth routes', function() {
  let user = {
    email: 'piper88@gmail.com',
    password: '123abc',
  };

  describe('testing POST /api/run', function() {
    describe('with valid user credentials', function() {
      it('should return a user', function(done) {
        request.post('localhost:3000/api/signup')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.email).to.equal('piper88@gmail.com');
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
    describe('with missing password', function() {
      it('should return a 403 error', function(done) {
        request.post('localhost:3000/api/signup')
        .send({
          email: 'nick@nick.com',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Please enter password\n');
          expect(res.status).to.equal(403);
          done();
        })
      })
    })
  })
})