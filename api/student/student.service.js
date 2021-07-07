const fs = require('fs');

const CustomMsg = require('../../classes/customMsg.js')
const fileService = require('../../services/file.service')
const teamService = require('../team/team.service')

const dbPath = './data/students.json'

module.exports = {
  getStudents,
  addStudents,
}

async function getStudents() {
  return await fileService.readFromFile(dbPath);
}


// getting students as CSV and enter them into json file
async function addStudents(students) {
  let studentsToSave = students.split(',');
  if (!studentsToSave || !studentsToSave.length) studentsToSave = [];
  let res = {};
  await teamService.clearTeam();
  await fileService.writeTofile(dbPath, studentsToSave);
  res.data = studentsToSave;
  return res;
}
