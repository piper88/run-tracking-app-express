'use strict';

const request = require('superagent');
const UserModel = require('../model/user.js');
const userMock = require('./lib/user-mock')
const expect = require('chai').expect;
const debug = require('debug')('run:auth-router-test');

require('../server.js');

describe('testing auth routes', function() {
  let user = {
    email: 'piper04@gmail.com',
    password: '123abc',
  };

  describe('testing POST /api/signup', function() {
  after((done) => {
    //clean up database by removing all users
    UserModel.remove({}, (err, res) => {
      if (err) done(err);
      if (res) debug('successfully deleted mock');
      done();
    })
  })
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

  describe('testing POST /api/login', function() {
    //before is run once before ALL tests within a describe block
    //beforeEach is run before every test (before every it block)
    // before((done) => {
    //   //calling userMock.call makes the 'this' of userMock this enclosing function (the describe statement). So then you can use 'this', and it will refer to the this of userMock
    //   userMock.call(this, done)
    // })
    after((done) => {
      //clean up database by removing all users
      UserModel.remove({}, (err, res) => {
        if (err) done(err);
        if (res) debug('successfully deleted mock');
        done();
      })
    })
    describe('with valid user credentials', function() {
      before((done) => {
        //calling userMock.call makes the 'this' of userMock this enclosing function (the describe statement). So then you can use 'this', and it will refer to the this of userMock
        userMock.call(this, done)
      })
      it('should return a token', (done) => {
        request.post('localhost:3000/api/login')
        .send({
          email: this.tempEmail,
          password: this.tempPassword
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.message).to.equal('User successfully logged in!');
          done();
        })
      })
    })
    describe('with invalid email', function() {
      before((done) => {
        userMock.call(this, done)
      })
      it('should return the message of user not found', (done) => {
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
      before((done) => {
        userMock.call(this, done)
      })
      it('should return the message of Incorrect password', (done) => {
        request.post('localhost:3000/api/login')
        .send({
          email: this.tempEmail,
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
