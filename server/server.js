const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uuid = require('uuid');  
const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle API requests.
app.post('/api/users', function (req, res) {
  var user = req.body.user;

  // console.log(' req.body',  req.body);

  function hasRequiredUserProps(user) {
    return missingRequiredUserProps(user).length == 0;
  }

  function missingRequiredUserProps(user) {
    var requiredProps = ['username', 'password', 'fname', 'lname', 'email']; 
    var missing = [];

    if (!user) return ['user object {user}'];

    requiredProps.forEach(function(prop) {
      if (!user.hasOwnProperty(prop)) 
        missing.push(prop);
    });

    return missing;
  }

  if (hasRequiredUserProps(user)) {
    var uid = app.addUser(user);

    return res.status(201)
              .json({id: uid})
              .end();
  } else {
    return res.status(400)
              .send({'required': missingRequiredUserProps(user)})
              .end();
  }
});

app.post('/api/login', function (req, res) {
  var uname = req.body.username;
  var pwd = req.body.password;

  for (var i = 0; i < userCache.length; i++) {
    var user = userCache[i];
    if (user.username === uname && user.password === pwd)
      return res.status(200).send({token: uuid()}).end();  
  }

  return res.status(401).json({error: 'Invalid username or password'}).end();
});

app.get('/api/users/:id', function (req, res) {
  // console.log('/api/users/:id', req.params.id);

  for (var i = 0; i < userCache.length; i++) {
    var user = userCache[i];
    if (user.id === req.params.id)
      return res.status(200).send(user).end();  
  }

  return res.status(200).end();
});

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


//test
var userCache = [{id: '101', username: 'test account'}];

app.addUser = function(user) {
  user.id = uuid();
  userCache.push(user);

  return user.id;
}

app.clearUsers = function() {
  userCache = [];
}