const fileService = require('../../services/file.service.js')
const utilService = require('../../services/util.service.js')

const dbPath = './data/user.json'

module.exports = {
  getByUsername,
  add
}

async function add(user) {
  user.id = utilService.makeid()
  const users = await _getUsers();
  users.push(user)
  await fileService.writeTofile(dbPath, users)
  return user
}

async function getByUsername(username) {
  const users = await _getUsers();
  const user = users.find(user => {
    return user.username === username
  })
  return user;
}

async function _getUsers() {
  return await fileService.readFromFile(dbPath);
}