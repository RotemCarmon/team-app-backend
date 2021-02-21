const dbPath = './data/user.json'
const fs = require('fs');
const CustomMsg = require('../classes/customMsg.js')
const fileService = require('./file.service.js')

module.exports = {
  getUsers,
  login
}

async function getUsers() {
  return await fileService.readFromFile(dbPath);
}

async function login(username, password) {
  const users = await getUsers();
  const user = users.find(user => {
    return user.username === username
  })
  if (!user || user.password !== password) {
    const customMsg = new CustomMsg('Username or password does not match!')
    customMsg.setStatus(401)
    throw customMsg
  }
  return user
}
