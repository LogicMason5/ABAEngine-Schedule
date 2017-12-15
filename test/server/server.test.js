const request = require('supertest');
const app = require('../../server/server.js').app;

describe('Users API Routes', function() {  

  describe('POST /users', function() {
    it('exist', function(done) {
        request(app)
          .post('/users')
          .expect(200, done);
    });
  });

});