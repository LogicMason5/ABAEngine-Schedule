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
  user.id = shortid.generate();
  user.password = encrypPassword(user.password);

  db.get('users')
    .push(user)
    .write();

  return user.id;
}

exports.findUser = function(prop) {
  return db.get('users')
           .find(prop)
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
