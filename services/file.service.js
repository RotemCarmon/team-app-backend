const fs = require('fs');

module.exports = {
  writeTofile,
  readFromFile
}

function writeTofile(filePath,data) {
  const dataToWrite = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, dataToWrite, (err) => {
      if (err) reject(err);
      resolve('Success')
    })
  })
}

function readFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(`error reading from ${filePath}:`, err);
      if (!data || !data.length) resolve(null)
      var parsedData = JSON.parse(data)
      resolve(parsedData);
    });
  })
}