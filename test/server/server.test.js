const request = require('supertest');
const app = require('../../server/server.js').app;

describe('Users API Routes', function() {  

  describe('POST /users', function() {
    it('create a new user', function(done) {
        request(app)
          .post('/users')
          .expect(201, done);
    });
  });

});