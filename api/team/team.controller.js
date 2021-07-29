const teamService = require('./team.service.js')
const CustomMsg = require('../../classes/customMsg.js')

async function getTeams(req, res, next) {
  try {
    const teams = await teamService.getTeams();
    res.json(teams);
  } catch (err) {
    next(err)
  }
}

async function addTeam(req, res, next) {
  try {
    const { team, isForce } = req.body;
    // isForce will skip the verification process
    const result = await teamService.addTeam(team, isForce);
    res.json(result);
  } catch (err) {
    if (err instanceof CustomMsg) res.status(err.statusCode()).json(err)
    else next(err)
  }
}

async function removeTeam(req, res, next) {
  try {
    const { id } = req.params;
    const teams = await teamService.removeTeam(id)
    res.json(teams);
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getTeams,
  removeTeam,
  addTeam
}