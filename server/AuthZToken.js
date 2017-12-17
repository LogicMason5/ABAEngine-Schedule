const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.verifyToken = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ error: 'No token provided' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res.status(500).send({ error: 'Failed to authenticate token' });

    next();
  });
}

module.exports.signToken = function(payload) {
  return jwt.sign(payload, config.secret, { expiresIn: '1h'});
};
