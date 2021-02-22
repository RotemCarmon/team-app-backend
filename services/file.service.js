const fs = require('fs');

module.exports = {
  writeTofile,
  readFromFile
}

function writeTofile(filePath, data) {
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
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf8')
    }
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) return reject(`error reading from ${filePath}:`, err);
      console.log('DATAAAAAAAAAAAAAAAAAA IS: ' + data);
      if (!data || !data.length) resolve(null)
      var parsedData = JSON.parse(data)
      resolve(parsedData);
    });
  })
}