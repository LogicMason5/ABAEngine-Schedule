const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle API requests.
app.post('/users', function (req, res) {
  var user = req.body.user;

  // console.log(' req.body',  req.body);

  function hasRequiredUserProps(user) {
    return missingRequiredUserProps(user).length == 0;
  }

  function missingRequiredUserProps(user) {
    var requiredProps = ['username', 'password', 'fname', 'lname', 'email']; 
    var missing = [];

    if (!user) return requiredProps;

    requiredProps.forEach(function(prop) {
      if (!user.hasOwnProperty(prop)) 
        missing.push(prop);
    });

    return missing;
  }

  if (hasRequiredUserProps(user))
    return res.status(201)
              .json({id: '101'})
              .end();
  else 
    return res.status(400)
              .send({'required': missingRequiredUserProps(user)})
              .end();
});

app.post('/login', function (req, res) {
  return res.status(200).json({token: 'token111'}).end();
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