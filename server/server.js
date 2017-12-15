const express = require('express');
const path = require('path');

const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle API requests.
app.post('/users', function (req, res) {
  var user = req.params.user;
  
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
    return res.status(201).end();
  else 
    return res.status(400)
              .send({'required': missingRequiredUserProps(user)})
              .end();
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