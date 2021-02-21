'use strict';

const request = require('superagent');
const RunModel = require('../model/run.js');
const expect = require('chai').expect;
const debug = require('debug')('run:run-test');
const moment = require('moment');

require('../server.js');

describe('testing run routes', function() {
  let run = {
    date: 'June 1st, 2020',
    distance: 2,
    pace: 700,
  };

  describe('testing GET /api/run', function() {

    describe('with valid date', function() {

      // let formattedDate = moment(run.date).format('MMMM Do, YYYY');
      before(done => {
        new RunModel({date: run.date, distance: run.distance, pace: run.pace}).save()
        .then(() => done())
        .catch((err) => done(err));
      })
      after(done => {
        RunModel.deleteOne({date: run.date})
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a run', function(done) {
        request.get('localhost:3000/api/run/2020-06-01')
        .end((err, res) => {
          console.log(res.body);
          if (err) return done(err);
          expect(res.body.date).to.equal('June 1st, 2020');
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('with invalid run date', function() {
      before(done => {
        new RunModel({date: run.date, distance: run.distance, pace: run.pace}).save()
        .then(() => done())
        .catch((err) => done(err));
      })
      after(done => {
        RunModel.deleteOne({date: run.date})
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a 404 not found', function(done) {
        request.get('localhost:3000/api/run/2020-07-01')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('testing POST requests to /api/run', function() {
    describe ('with valid body', function() {
      after(done => {
        RunModel.deleteOne({date: run.date})
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a run', function(done) {
        request.post('localhost:3000/api/run')
        .send({
          date: '2020-06-01',
          distance: 5,
          pace: 700,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.date).to.equal('June 1st, 2020');
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe ('with valid body and date is today', function() {
      after(done => {
        RunModel.deleteOne({date: run.date})
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a run', function(done) {
        request.post('localhost:3000/api/run')
        .send({date: 'today', distance: 5, pace: 745})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.date).to.equal(moment(Date.now()).format('MMMM Do, YYYY'));
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe ('with missing body', function() {
      it('should return a 403 error', function(done) {
        request.post('localhost:3000/api/run')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Date required\nDistance required\nPace required\n')
          done();
        });
      });
    });

    describe ('with missing date', function() {
      it('should return a 403 error', function(done) {
        request.post('localhost:3000/api/run')
        .send({distance: 4.5, pace: 800})
        .end((err, res) => {
          expect(res.body.message).to.equal('Date required\n');
          expect(res.status).to.equal(403);
          done();
        });
      });
    });
    describe ('with missing distance', function() {
      it('should return a 403 error', function(done) {
        request.post('localhost:3000/api/run')
        .send({date: '2019-05-20', pace: 800})
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Distance required\n');
          done();
        });
      });
    });
    describe ('with missing pace', function() {
      it('should return a 403 error', function(done) {
        request.post('localhost:3000/api/run')
        .send({date: '2450-12-25', distance: 4.5})
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Pace required\n');
          done();
        });
      });
    });
  });

  describe('testing DELETE requests to /api/run/:date', function() {
    describe('with valid date', function() {
      before(done => {
        new RunModel({date: run.date, distance: run.distance, pace: run.pace}).save()
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a 204 code', function(done) {
        request.delete('localhost:3000/api/run/2020-06-01')
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });

    describe('with invalid date', function() {
      before(done => {
        new RunModel({date: run.date, distance: run.distance, pace: run.pace}).save()
        .then(() => done())
        .catch(err => done(err));
      });
      after(done => {
      RunModel.deleteOne({date: run.date})
      .then(() => done())
      .catch(err => done(err));
      });
      it('should return a 404 not found', function(done) {
        request.delete('localhost:3000/api/run/never')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

  });

  describe('testing PUT /api/run', function() {
    debug('testing PUT /api/run');

    describe('with valid date, updating all run properties', function() {
      before(done => {
        new RunModel({date: run.date, distance: run.distance, pace: run.pace}).save()
        .then(() => done())
        .catch(err => done(err));
      });
      after(done => {
        RunModel.deleteOne({date: '2020-06-30'})
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a new item', function(done) {
        request.put('localhost:3000/api/run/2020-06-01')
        .send({date: '2020-06-30', distance: 12, pace: 930})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.distance).to.equal(12);
          done();
        });
      });
    });

    describe('with valid date and only updating distance', function() {
      before(done => {
        new RunModel({date: run.date, distance: run.distance, pace: run.pace}).save()
        .then(() => done())
        .catch(err => done(err));
      });
      after(done => {
        RunModel.deleteOne({date: run.date})
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a run with a new distance', function(done) {
        request.put('localhost:3000/api/run/2020-06-01')
        .send({distance: 12})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.distance).to.equal(12);
          done();
        });
      });
    });

    describe('with valid date and only updating pace', function() {
      before(done => {
        new RunModel({date: run.date, distance: run.distance, pace: run.pace}).save()
        .then(() => done())
        .catch(err => done(err));
      });
      after(done => {
        RunModel.deleteOne({date: run.date})
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a run with a new pace', function(done) {
        request.put('localhost:3000/api/run/2020-06-01')
        .send({pace: 500})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.pace).to.equal(500);
          done();
        });
      });
    });

    describe('with invalid date', function() {
      before(done => {
        new RunModel({date: run.date, distance: run.distance, pace: run.pace}).save()
        .then(() => done())
        .catch(err => done(err));
      });
      after(done => {
        RunModel.deleteOne({date: run.date})
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a 404 error', function(done) {
        request.put('localhost:3000/api/run/whenever')
        .send({date:'whenever', distance: 2, pace: 630})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with missing request body', function() {
      before(done => {
        new RunModel({date: run.date, distance: run.distance, pace: run.pace}).save()
        .then(() => done())
        .catch(err => done(err));
      });
      after(done => {
        RunModel.deleteOne({date: run.date})
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a 400 error', function(done) {
        request.put('localhost:3000/api/run/today')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('must update at least one field')
          done();
        });
      });
    });
  });
});
