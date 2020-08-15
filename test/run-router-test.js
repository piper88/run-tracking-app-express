'use strict';

const request = require('superagent');
const RunModel = require('../model/run.js');
const expect = require('chai').expect;
const storage = require('../lib/storage.js');
const debug = require('debug')('run:run-test');

require('../server.js');

describe('testing run routes', function() {
  // storage.createResourceDirectory();
  let run = {
    date: 'today',
    distance: 2,
    pace: 700,
  };

  describe('testing GET /api/run', function() {

    describe('with valid date', function() {

      before(done => {
        new RunModel({date: run.date, distance: run.distance, pace: run.pace}).save()
        .then(() => done())
        .catch((err) => done(err));
      })
      it('should return a run', function(done) {
        request.get('localhost:3000/api/run/today')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.date).to.equal('today');
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('with invalid run date', function() {
      it('should return a 404 not found', function(done) {
        request.get('localhost:3000/api/run/never')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('testing POST requests to /api/run', function() {
    describe ('with valid body', function() {
      it('should return a run', function(done) {
        request.post('localhost:3000/api/run')
        .send(run)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.date).to.equal('today');
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
        .send({date: 'yesterday', pace: 800})
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
        .send({date: 'whenever', distance: 4.5})
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
        request.delete('localhost:3000/api/run/today')
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
      RunModel.deleteOne()
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

  // describe('testing PUT /api/run', function() {
  //   debug('testing PUT /api/run');
  //   describe('with valid date and body', function() {
  //     before(done => {
  //       let oldRun = {
  //         date: 'tomorrow',
  //         distance: 6,
  //         pace: 730,
  //       };
  //       storage.createItem(oldRun)
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     after(done => {
  //       storage.deleteItem('tomorrow')
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     it('should return a new item', function(done) {
  //       request.put('localhost:3000/api/run/tomorrow')
  //       .send({date: 'tomorrow', distance: 12, pace: 930})
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.distance).to.equal(12);
  //         done();
  //       });
  //     });
  //   });
  //   describe('with invalid date', function() {
  //     before(done => {
  //       let run = {
  //         date: '6-8-20',
  //         distance: 1,
  //         pace: 600,
  //       };
  //       storage.createItem(run)
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     after(done => {
  //       storage.deleteItem('6-8-20')
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     it('should return a 404 error', function(done) {
  //       request.put('localhost:3000/api/run/whenever')
  //       .send({date:'whenever', distance: 2, pace: 630})
  //       .end((err, res) => {
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with missing date in body', function() {
  //     before(done => {
  //       let oldRun = {
  //         date: '6-8-20',
  //         distance: 1,
  //         pace: 600,
  //       };
  //       storage.createItem(oldRun)
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     after(done => {
  //       storage.deleteItem('6-8-20')
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     it('should return a 400 error', function(done) {
  //       request.put('localhost:3000/api/run/6-8-20')
  //       .send({distance: 5, pace: 500})
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //     });
  //   });
  //   describe('with missing distance', function() {
  //     before(done => {
  //       let run = {
  //         date: '6-8-20',
  //         distance: 1,
  //         pace: 600,
  //       };
  //       storage.createItem(run)
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     after(done => {
  //       storage.deleteItem('6-8-20')
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     it('should return a 400 error', function(done) {
  //       request.put('localhost:3000/api/run/6-8-20')
  //       .send({date: '6-8-20', pace: 500})
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //     });
  //   });
  //   describe('with missing pace', function() {
  //     before(done => {
  //       let run = {
  //         date: '6-8-20',
  //         distance: 1,
  //         pace: 600,
  //       };
  //       storage.createItem(run)
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     after(done => {
  //       storage.deleteItem('6-8-20')
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     it('should return a 400 error', function(done) {
  //       request.put('localhost:3000/api/run/6-8-20')
  //       .send({date: '6-8-20' ,distance: 5})
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //     });
  //   });
  //   describe('with missing request body', function() {
  //     before(done => {
  //       let run = {
  //         date: '6-8-20',
  //         distance: 1,
  //         pace: 600,
  //       };
  //       storage.createItem(run)
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     after(done => {
  //       storage.deleteItem('6-8-20')
  //       .then(() => done())
  //       .catch(err => done(err));
  //     });
  //     it('should return a 400 error', function(done) {
  //       request.put('localhost:3000/api/run/6-8-20')
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //     });
  //   });
  // });
});
