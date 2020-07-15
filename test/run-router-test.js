'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const storage = require('../lib/storage.js');
const debug = require('debug')('run:run-test');

require('../server.js');

describe('testing run routes', function() {
  storage.createResourceDirectory();

  describe('testing GET /api/run', function() {

    describe('with missing run date', function() {
      debug('testing with missing run date');
      it('should return a 400 bad request', function(done) {
        request.get('localhost:3000/api/run/')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          // expect(err).to.equal('expected date');
          done();
        });
      });
    });

  });
});
