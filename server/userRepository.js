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
