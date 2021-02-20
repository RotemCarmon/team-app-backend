const dbPath = './data/user.json'
const fs = require('fs');
const CustomMsg = require('../customMsg.js')

module.exports = {
  getUsers,
  login
}

function getUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if (err) reject('error getting users:', err);
      if (!data || !data.length) resolve(null)
      var parsedData = JSON.parse(data)
      resolve(parsedData);
    });
  })
}

async function login (username, password) {
  const users = await getUsers();
  console.log('users:', users)
  const user = users.find(user => {
    return user.username === username
  })
  console.log('user1111111:', user)
  if(!user || user.password !== password) {
    const customMsg = new CustomMsg('Username or password does not match!')
    customMsg.setStatus(401)
    throw customMsg
}
  return user
}


function _writeToUsers(data) {
  const dataToWrite = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    fs.writeFile(dbPath, dataToWrite, (err) => {
      if (err) reject(err);
      resolve('Success')
    })
  })
}