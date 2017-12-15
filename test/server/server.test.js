const request = require('supertest');
const app = require('../../server/server.js').app;

describe('Users API Routes', function() {  

  describe('POST /users', function() {
    it('should accept a user object as param', function(done) {
      request(app)
        .post('/users')
        .expect(400, done);
    });
  });

});