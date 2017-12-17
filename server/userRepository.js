const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const uuid = require('uuid')

init();

function init() {
  db.defaults({ users: [] }).write();
}

exports.addUser = function(user) {
  user.id = uuid();

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
