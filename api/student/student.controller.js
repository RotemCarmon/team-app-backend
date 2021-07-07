const studentService = require('./student.service.js')
const CustomMsg = require('../../classes/customMsg.js')

async function getStudents(req, res, next) {
  try {
    const students = await studentService.getStudents();
    res.json(students);
  } catch (err) {
    if (err instanceof CustomMsg) res.status(err.statusCode()).json(err)
    else next(err)
  }
}

async function addStudents(req, res, next) {
  try {
    const { students } = req.body;
    // isForce will skip the verification process
    const result = await studentService.addStudents(students);
    res.json(result);
  } catch (err) {
    if (err instanceof CustomMsg) res.status(err.statusCode()).json(err)
    else next(err)
  }
}

module.exports = {
  getStudents,
  addStudents
}