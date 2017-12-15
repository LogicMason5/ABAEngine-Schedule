const express = require('express');
const path = require('path');

const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle API requests.
app.post('/users', function (req, res) {
  // res.set('Content-Type', 'application/json');
  // res.send('{"message":"Hello from the custom server!"}');
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