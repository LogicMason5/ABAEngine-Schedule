const request = require('supertest');
const server = require('../../server/server.js');
const app = require('../../server/server.js').app;
const expect = require('chai').expect;  
const userRepository = require('../../server/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

describe('Users API Routes', function() {  
  
  describe('POST /api/users', function() {

    it('should accept a user object as param', function(done) {
      request(app)
        .post('/api/users')
        .expect(400, done);
    });

    it('should require a user object as param', function(done) {
      var required = ['user object {user}'];
      var param = {};

      request(app)
        .post('/api/users')
        .send(param)
        .expect(400)
        .end(function(err, res) {
          expect(res.body).to.have.property('required');
          expect(res.body.required).to.have.lengthOf(required.length);
          expect(res.body.required).to.deep.equal(required);
          done(err);
        });
    });


    it('returns the missing required properties', function(done) {
      var required = ['username', 'password', 'fname', 'lname', 'email']; 
      var param = { user: {}};

      request(app)
        .post('/api/users')
        .send(param)
        .expect(400)
        .end(function(err, res) {
          expect(res.body).to.have.property('required');
          expect(res.body.required).to.have.lengthOf(required.length);
          expect(res.body.required).to.deep.equal(required);
          done(err);
        });
    });

    it('returns the id of the created user', function(done) {
      var param = {
        user: { 
          username: 'mike', 
          password: 'pwd', 
          fname: 'Michael', 
          lname: 'G', 
          email: 'pong@test.com'
        }
      }

      request(app)
        .post('/api/users')
        .send(param)
        .expect(201, function(err, res) {
          expect(res.body).to.have.property('id');
          userRepository.removeUserById(res.body.id);
          done(err);
        });
    });

    describe('Invalid operation', function() {
      var userId = "";

      var param = {
        user : { 
          username: 'mike', 
          password: 'pwd', 
          fname: 'Michael', 
          lname: 'G', 
          email: 'pong@test.com'
        }
      }
  
      beforeEach(function() {
        userId = userRepository.addUser(param.user);
      });
  
      afterEach(function() {
        userRepository.removeUserById(userId);
      });

      it('should return an error if username already exist', function(done) {
        request(app)
          .post('/api/users')
          .send(param)
          .expect(401, function(err, res) {
            expect(res.body.error).to.equal('Username is already taken');
            done(err);
          });
      });

      it('should return an error if email already exist', function(done) {
        param.user.username = 'newUsername';

        request(app)
          .post('/api/users')
          .send(param)
          .expect(401, function(err, res) {
            expect(res.body.error).to.equal('Email is already taken');
            done(err);
          });
      });

    });
  });

  describe('POST /api/login', function() {
    var user = { 
      username: 'mike', 
      password: 'pwd', 
      fname: 'Michael', 
      lname: 'G', 
      email: 'pong@test.com'
    }

    beforeEach(function() {
      userId = userRepository.addUser(user);
    });

    afterEach(function() {
      userRepository.removeUserById(userId);
    });

    it('should return a session token for valid user', function(done) {
      var validLogin = {
        username: user.username, 
        password: user.password
      };

      request(app)
        .post('/api/login')
        .send(validLogin)
        .expect(200, function(err, res) {
          expect(res.body).to.have.property('token');
          var decoded = jwt.verify(res.body.token, config.secret);
          expect(userId).to.equal(decoded.id);
          done(err);
        });
    });

    it('should return error if using wrong username', function(done) {
      var invalid = { 
        username: 'xxx', 
        password: 'xxx'
      };

      request(app)
        .post('/api/login')
        .send(invalid)
        .expect(401, function(err, res) {
          expect(res.body.error).to.equal('Invalid username or password');
          done(err);
        });
    });

    it('should return error if using wrong password', function(done) {
      var invalid = { 
        username: user.username, 
        password: 'xxx'
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
    var token = "";
    var user = { 
      username: 'mike', 
      password: 'pwd', 
      fname: 'Michael', 
      lname: 'G', 
      email: 'pong@test.com'
    }

    beforeEach(function() {
      userId = userRepository.addUser(user);
      request(app)
        .post('/api/login')
        .send({
          username: user.username,
          password: user.password
        })
        .end(function(err, res) {
          token = res.body.token;
        });
    });

    afterEach(function() {
      userRepository.removeUserById(userId);
    });

    describe('Bad Token', function() {
      it('should return an error if no token is present', function(done) {
        request(app)
          .get('/api/users/' + userId)
          .expect(401, function(err, res) {
            expect(res.body.message).to.equal('No token provided');
            done(err);
          });
      });
  
      it('should return an error if the failed to authenticate token', function(done) {
        request(app)
          .get('/api/users/' + userId)
          .set('x-access-token', 'someRandomToken')
          .expect(500, function(err, res) {
            expect(res.body.message).to.equal('Failed to authenticate token');
            done(err);
          });
      });
    });

    describe('Verified Token', function() {
      it('user with wrong id is not found or does not exist', function(done) {
        var invalidUserId = "xxx";
        request(app)
          .get('/api/users/' + invalidUserId)
          .set('x-access-token', token)
          .expect(404, function(err, res) {
            expect(res.body.message).to.equal('No user found');
            done(err);
          });
      });

      it('should return user details using the id', function(done) {
        request(app)
          .get('/api/users/' + userId)
          .set('x-access-token', token)
          .expect(200, function(err, res) {
            expect(res.body.username).to.equal(user.username);
            expect(res.body.fname).to.equal(user.fname);
            expect(bcrypt.compareSync(user.password, res.body.password)).to.be.true;
            expect(res.body.lname).to.equal(user.lname);
            expect(res.body.email).to.equal(user.email);
            done(err);
          });
      });
    });

  });

  describe('POST /api/logout', function() {
    it('should exist', function(done) {
      request(app)
        .post('/api/logout')
        .expect(200, done);
    });
  });

});