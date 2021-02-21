const teamService = require('./team.service.js')

async function  getTeams(req, res, next) {
  try {
    const teams = await teamService.getTeamForDisplay();
    res.json(teams);
  } catch (err) {
    next(err)
  }
}

async function  addTeam(req, res, next) {
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

async function  removeTeam(req, res, next) {
  try {
    const { id } = req.params;
    const removedTeam = await teamService.removeTeam(id)
    res.json(removedTeam);
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getTeams,
  removeTeam,
  addTeam
}