const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const shortid = require('shortid');

const bcrypt = require('bcrypt');
const saltRounds = 10;

init();

function init() {
  db.defaults({ users: [] }).write();
}

function encrypPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

exports.addUser = function(user) {
  var newUser = Object.assign({}, user);

  newUser.id = shortid.generate();
  newUser.password = encrypPassword(user.password);

  db.get('users')
    .push(newUser)
    .write();

  return newUser.id;
}

exports.findUserWithLogin = function(prop) {
  return db.get('users')
           .find(function(user) {
              return (prop.username === user.username 
                  && bcrypt.compareSync(prop.password, user.password));
           })
           .value();
}

exports.findUserById = function(userId) {
  return db.get('users')
           .find({ id: userId })
           .value();
}

exports.removeUserById = function(userId) {
  db.get('users')
    .remove({ id: userId })
    .write()
}

exports.propertyExist = function(prop) {
  return db.get('users')
           .find(prop)
           .value() 
}

exports.clear = function() {
  init();
}
