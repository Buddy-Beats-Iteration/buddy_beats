const fs = require('fs');
const path = require('path');

const expect = require('chai').expect;
const request = require('supertest');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

require('../server/server.js');


describe('Server routes', function() {
  describe('GET request to /', function() {
    it('should respond with a status of 200', function(done) {
      request(HOST)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200, done);
    });
  });

  describe('GET request to /bundle.js', function() {
    it('should respond with a status of 200', function(done) {
      request(HOST)
        .get('/bundle.js')
        .expect('Content-Type', /application\/javascript/)
        .expect(200, done);
    });

    it('should respond with the bundle.js file', function(done) {
      request(HOST)
        .get('/bundle.js')
        .expect(response => {
          const file = fs.readFileSync(path.resolve('./bundle.js'));
          expect(file.toString()).to.equal(response.text);
        })
        .expect(200, done);
    });
  });

  describe('GET request to invalid route', function() {
    it('should respond with a status of 404',function(done) {
      request(HOST)
        .get('/hi')
        .expect(404,done)
    });
  });

  describe('POST request to invalid route', function() {
    it('should respond with a status of 404', function(done) {
      request(HOST)
        .post('/badroute')
        .expect(404, done);
    });
  });
});