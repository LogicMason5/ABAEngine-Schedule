const userRepo = require('./userRepository');
const authZToken = require('./AuthZToken');

function createUser(req, res) {
  var user = req.body.user;

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
    if (userRepo.propertyExist({username: user.username}))
      return res.status(401)
                .json({error: "Username is already taken"})
                .end();

    if (userRepo.propertyExist({email: user.email}))
      return res.status(401)
                .json({error: "Email is already taken"})
                .end();

    var userId =  userRepo.addUser(user);

    return res.status(201)
              .json({id: userId})
              .end();
  } else {
    return res.status(400)
              .send({'required': missingRequiredUserProps(user)})
              .end();
  }
}

function login(req, res) {
  var user = userRepo.findUserWithLogin({
    username: req.body.username,
    password: req.body.password
  });
  
  if (user) {
    return res.status(200)
              .json({
                userId: user.id, 
                token: authZToken.signToken({id: user.id})
              })
              .end();  
  }
    
  return res.status(401).json({error: 'Invalid username or password'}).end();
}

function logout(req, res) {
  return res.status(200).end(); 
}

function getUsers(req, res) {
  return res.status(200).json(userRepo.allUsers()).end();  
}

function getUser(req, res) {
  var user = userRepo.findUserById(req.params.id);
  if (user) {
    return res.status(200).json(user).end();  
  }

  return res.status(404).json({error: 'No user found'}).end();
}

module.exports.createUser = createUser;
module.exports.login = login;
module.exports.logout = logout;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;