const request = require('supertest');
const app = require('../../server/server.js').app;
const expect = require('chai').expect;    // Using Expect style

describe('Users API Routes', function() {  

  describe('POST /users', function() {

    describe('INVALID USER', function() {
      it('should accept a user object as param', function(done) {
        request(app)
          .post('/users')
          .expect(400, done);
      });

      it('returns the missing required properties', function(done) {
        var empty = {};

        request(app)
          .post('/users')
          .send(empty)
          .expect(400)
          .end(function(err, res) {
            expect(res.body).to.have.property('required')
            done(err);
          });
      });
    });
    
  });

});