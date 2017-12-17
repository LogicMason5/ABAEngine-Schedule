const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uuid = require('uuid');  
const app = express();
const morgan = require('morgan');
const userRepo = require('./userRepository');
const authZToken = require('./AuthZToken');
const apiHandler = require('./ApiHandler');

app.use(morgan(':method :url :status'));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle API requests.
app.post('/api/users', apiHandler.createUser);
app.post('/api/login', apiHandler.login);
app.post('/api/logout', apiHandler.logout);

app.get('/api/users', authZToken.verifyToken, apiHandler.getUsers);
app.get('/api/users/:id', authZToken.verifyToken, apiHandler.getUser);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

function start() {
  var port = process.env.PORT || 3001;
  app.listen(port, function () {
    console.log(`Listening on port ${port}`);
  });
}

exports.start = start;
exports.app = app;