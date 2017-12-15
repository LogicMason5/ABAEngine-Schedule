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
        var required = ['username', 'password', 'fname', 'lname', 'email']; 
        var empty = {};

        request(app)
          .post('/users')
          .send(empty)
          .expect(400)
          .end(function(err, res) {
            expect(res.body).to.have.property('required');
            expect(res.body.required).to.have.lengthOf(required.length);
            expect(res.body.required).to.deep.equal(required);
            done(err);
          });
      });
    });

    it('returns the id of the created user', function(done) {
      var valid = { 
        user : {
          username: 'mike', 
          password: 'pwd', 
          fname: 'Michael', 
          lname: 'G', 
          email: 'pong@test.com'
        }
      }

      request(app)
        .post('/users')
        .send(valid)
        .expect(201, function(err, res) {
          expect(res.body.id).to.equal('101');
          done(err);
        });
    });
    
  });

  describe('POST /login', function() {
    it('should exist', function(done) {
      request(app)
      .post('/login')
      .expect(200, done);
    });

    it('should return a session token for valid user', function(done) {
      var valid = { 
        user : {
          username: 'mike', 
          password: 'pwd', 
          fname: 'Michael', 
          lname: 'G', 
          email: 'pong@test.com'
        }
      }

      request(app)
        .post('/login')
        .send(valid)
        .expect(200, function(err, res) {
          expect(res.body.token).to.equal('token111');
          done(err);
        });
    });
  });

});