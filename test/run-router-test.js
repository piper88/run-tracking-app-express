'use strict';

const request = require('superagent');
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
      debug('testing with valid date');
      before(done => {
      storage.createItem(run)
      .then(() => done())
      .catch((err) => done(err));
    })
    after(done => {
      storage.deleteItem(run.date)
      .then(() => done())
      .catch((err) => done(err));
    })
      it('should return a run', function(done) {
        request.get(`localhost:3000/api/run/today`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done()
        })
      })
    })

    describe('with missing run date', function() {
      debug('testing with missing run date');
      it('should return a 404 not found', function(done) {
        request.get('localhost:3000/api/run')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          // expect(res.error.text).to.equal('"expected date"');
          done();
        });
      });
    });

    describe('with invalid run date', function() {
      debug('testing with invalid run date');
      it('should return a 404 not found', function(done) {
        request.get('localhost:3000/api/run/never')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          // expect(res.error.text).to.equal('"expected date"');
          done();
        });
      });
    });

  });
});
