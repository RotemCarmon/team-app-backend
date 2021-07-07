const fs = require('fs');

const CustomMsg = require('../../classes/customMsg.js')
const utilService = require('../../services/util.service.js')
const fileService = require('../../services/file.service')
const dbService = require('../../services/db.service')

const dbPath = './data/db.json'
const dbMongoPath = 'mongodb+srv://Shachar:123@teams.ul6xp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
module.exports = {
  getTeams,
  addTeam,
  removeTeam,
  clearTeam
}

async function getTeams() {
  try {
    const collection = await dbService.getCollection('team')
    var teams = await collection.find().toArray();
    return teams
  } catch (err) {
    console.error('cannot find teams', err);
    throw err
  }
}

async function addTeam(team, isForce) { // add/update
  try {
    let savedTeam = null;
    let res = {};
    const collection = await dbService.getCollection('team');
    var teams = await collection.find().toArray();
    if (!isForce) res = await _varifyChoise(teams, team);
    if (team && team._id) { // update team
      const teamToUpdate = { ...team };
      delete teamToUpdate._id;
      await collection.updateOne({ _id: team._id }, { $set: { ...teamToUpdate } });
      res.data = team;
    } else { // add team
      const newTeam = { ...team, _id: utilService.makeid() };
      savedTeam = await collection.insertOne(newTeam);
      res.data = savedTeam
    }
    return res
  } catch (err) {
    console.log("Team err");
    throw err;
  }
}

async function removeTeam(teamId) {
  try {
    // const store = asyncLocalStorage.getStore();
    const collection = await dbService.getCollection('team')
    const query = { _id: teamId }
    await collection.deleteOne(query)
  } catch (err) {
    throw err
  }
}

async function clearTeam() {
  try {
    const collection = await dbService.getCollection('team')
    await collection.deleteMany({})
  } catch (err) {
    throw err
  }
}

//////////////////////////////
//////////////////////////////
//////////////////////////////

function _varifyChoise(teams, team) {
  return new Promise((resolve, reject) => {
    teams.forEach(t => {
      if (team.member1 === t.member1) reject(new CustomMsg('You\'ve already chosen a partner'))
      else if (team.member2 === t.member1 && team.member1 === t.member2) {
        console.log('It\'s a match!!')
        resolve(new CustomMsg('It\'s a match🥳\n You\'ve both chosen each other', 1));
      }
    })
    resolve({})
  })
}

