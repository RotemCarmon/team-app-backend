const fs = require('fs');

const CustomMsg = require('../../classes/customMsg.js')
const utilService = require('../../services/util.service.js')
const fileService = require('../../services/file.service')

const dbPath = './data/db.json'

module.exports = {
  getTeams,
  addTeam,
  getTeamForDisplay,
  removeTeam
}

async function getTeams() {
  return await fileService.readFromFile(dbPath);
}


async function getTeamForDisplay() {
  const teams = await getTeams()
  const teamsToFilterOut = []
  const teamsForDisplay = teams.filter((team, idx) => {
    const dupIdx = teams.findIndex(t => {
      return t.member2 === team.member1 && t.member1 === team.member2
    })
    if (dupIdx !== -1) {
      teamsToFilterOut.push(dupIdx);
      team.isMatch = true;
    }
    if (teamsToFilterOut.includes(idx)) return false
    return team;
  })
  return teamsForDisplay;
}

async function addTeam(team, isForce) {
  let teams = await getTeams();
  if (!teams || !teams.length) teams = [];
  let res;
  if (!isForce) res = await _varifyChoise(teams, team);
  team.id = utilService.makeid()
  teams.push(team)
  await fileService.writeTofile(dbPath, teams);
  if (res?.type === 'Custom Message') {
    return res
  } else return teams
}

async function removeTeam(teamId) {
  const teams = await getTeams();
  const teamIdx = teams.findIndex(team => team.id === teamId);
  if (teamIdx === -1) throw new Error(`Team Id ${teamId} was not found!`);
  const [removedTeam] = teams.splice(teamIdx, 1)
  await fileService.writeTofile(dbPath, teams)
  return removedTeam;
}

//////////////////////////////
//////////////////////////////
//////////////////////////////

function _varifyChoise(teams, team) {
  return new Promise((resolve, reject) => {
    // if (teams.some(t => team.member1 === t.member1)) throw new CustomMsg('You already chose a partner before')
    teams.forEach(t => {
      if (team.member1 === t.member1) reject(new CustomMsg('You already chose a partner before'))
      else if (team.member2 === t.member1 && team.member1 === t.member2) {
        console.log('It\'s a match!!')
        resolve(new CustomMsg('The team has been chosen by both members\n🥳'));
      }
    })
    resolve(true)
  })
}

