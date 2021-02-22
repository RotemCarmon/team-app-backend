const fs = require('fs');

const CustomMsg = require('../../classes/customMsg.js')
const utilService = require('../../services/util.service.js')
const fileService = require('../../services/file.service')

const dbPath = './data/db.json'

module.exports = {
  getTeams,
  addTeam,
  removeTeam
}

async function getTeams() {
  return await fileService.readFromFile(dbPath);
}

async function addTeam(team, isForce) {
  let teams = await getTeams();
  if (!teams || !teams.length) teams = [];
  let res = {};
  if (!isForce) res = await _varifyChoise(teams, team);
  team.id = utilService.makeid()
  teams.push(team)
  await fileService.writeTofile(dbPath, teams);
  res.data = teams
  return res
}

async function removeTeam(teamId) {
  const teams = await getTeams();
  const teamIdx = teams.findIndex(team => team.id === teamId);
  if (teamIdx === -1) throw new Error(`Team Id ${teamId} was not found!`);
  const [removedTeam] = teams.splice(teamIdx, 1)
  await fileService.writeTofile(dbPath, teams)
  return teams;
}

//////////////////////////////
//////////////////////////////
//////////////////////////////

function _varifyChoise(teams, team) {
  return new Promise((resolve, reject) => {
    teams.forEach(t => {
      if (team.member1 === t.member1) reject(new CustomMsg('You already chose a partner before'))
      else if (team.member2 === t.member1 && team.member1 === t.member2) {
        console.log('It\'s a match!!')
        resolve(new CustomMsg('The team has been chosen by both members\n🥳', 1));
      }
    })
    resolve({})
  })
}

