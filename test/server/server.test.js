const request = require('supertest');
const server = require('../../server/server.js');
const app = require('../../server/server.js').app;
const expect = require('chai').expect;    // Using Expect style

describe('Users API Routes', function() {  
  
  describe('POST /api/users', function() {

    describe('INVALID USER', function() {
      it('should accept a user object as param', function(done) {
        request(app)
          .post('/api/users')
          .expect(400, done);
      });

      it('returns the missing required properties', function(done) {
        var required = ['username', 'password', 'fname', 'lname', 'email']; 
        var empty = {};

        request(app)
          .post('/api/users')
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
        .post('/api/users')
        .send(valid)
        .expect(201, function(err, res) {
          expect(res.body.id).to.equal('101');
          done(err);
        });
    });
    
  });

  describe('POST /api/login', function() {
    it('should return a session token for valid user', function(done) {
      var valid = { 
          username: 'user', 
          password: 'pwd'
      };

      request(app)
        .post('/api/login')
        .send(valid)
        .expect(200, function(err, res) {
          expect(res.body.token).to.equal('token111');
          done(err);
        });
    });

    it('should return error if using invalid credentials', function(done) {
      var invalid = { 
          username: 'noname', 
          password: 'pwd'
      };

      request(app)
        .post('/api/login')
        .send(invalid)
        .expect(401, function(err, res) {
          expect(res.body.error).to.equal('Invalid username or password');
          done(err);
        });
    });
  });

  describe('GET /api/users/:id', function() {
    var userId = "";

    var user = { 
      username: 'mike', 
      password: 'pwd', 
      fname: 'Michael', 
      lname: 'G', 
      email: 'pong@test.com'
    }

    beforeEach(function() {
      userId = app.addUser(user);
      console.log(userId);
    });

    // afterEach(function() {
    //   app.clearUsers();
    // });

    it('should exist', function(done) {
      request(app)
        .get('/api/users/' + userId)
        .expect(200, done);
    });

    it('should return user details using the id', function(done) {
      request(app)
        .get('/api/users/' + userId)
        .expect(200, function(err, res) {
          expect(res.body.username).to.equal(user.username);
          expect(res.body.fname).to.equal(user.fname);
          expect(res.body.password).to.equal(user.password);
          expect(res.body.lname).to.equal(user.lname);
          expect(res.body.email).to.equal(user.email);
          done(err);
        });
    });

  });

});