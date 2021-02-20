'use strict';

const students = ['', 'Arthur Volkov', 'Ori Rose', 'Avi Koenig', 'Almog Lemberg', 'Avi Lugassi', 'Aviv Zohar', 'Ofir Dahan', 'Oren Karaso', 'Oshri Yoktan', 'Izek Golland', 'Anton Zebnitski', 'Erez Hershkovitz', 'Ari Gabay', 'Bari Avni', 'Guy Zohar', 'Gali Nickel', 'Gilad Peltz', 'Lian Skopis', 'Dariya Kartko', 'Dor Shaul', 'Dorran Gavish', 'Hadar Harush', 'Hadar Marom', 'Zina Mihailov', 'Noy Hason', 'Chen Sella', 'Timophei Tchitchkan', 'Yonatan Mizrahi', 'Yoni Bar', 'Ytav Peer', 'Yaniv Soudneko', 'Ifat Braslavi', 'Carmit Vaknin', 'Lotan Mashiah', 'Liz Hajaj', 'Leetal Rivlin Tal', 'Michael Peer', 'Noa Reisman', 'Nofar Gabso', 'Oded Ron', 'Omer Golan', 'Eran Sevil', 'Ream Lasry', 'Rom Soloman', 'Roi Levy', 'Ran Porath', 'Shoshana Elsa', 'Shachar Dorfzaun', 'Shiran Cohen', 'Sharon Wirtzer']

// CONTROLLER
function init() {
  renderStudents()
  getLoggedinUser()
}

function getLoggedinUser() {
  const loggedinUser = getUserFromStorage()
  if (!loggedinUser) return;
  if (loggedinUser.isAdmin) renderTeams()
}

function renderStudents() {
  const strHtmls = students.map(student => {
    return `<option value="${student}" >${student}</option>`
  }).join('')
  document.querySelector('.select-your-name').innerHTML = strHtmls;
  document.querySelector('.select-partner-name').innerHTML = strHtmls;
}

async function submitTeam(isForce = null) {
  const member1 = document.querySelector('.select-your-name').value;
  const member2 = document.querySelector('.select-partner-name').value;
  if (!_isVerified(member1, member2)) return
  const res = await postTeam(member1, member2, isForce)
  if (res.type === 'Custom Message') userMsg(res.message);
  else userMsg(`Submited successfully\nTeam: ${member1} & ${member2}`);
  document.querySelector('.select-your-name').value = ''
  document.querySelector('.select-partner-name').value = ''
}

function _isVerified(member1, member2) {
  if (member1 === '' || member2 === '') {
    userMsg('Must choose both your name and your partner\'s name');
    return false;
  }
  else if (member1 === member2) {
    userMsg('Can\'t choose your own name as the partner!');
    return false;
  } else return true;
}


async function renderTeams() {
  const teams = await getTeamsForDisplay()
  let strHtmls = ''
  strHtmls = teams.map(team => {
    return `
    <tr class="${team.isMatch ? 'isMatch' : ''}" >
    <td>${team.member1}</td>
    <td>${team.member2}</td>
    <td class="remove-team"  onclick="onRemoveTeam('${team.id}')">X</td>
    </tr>`
  }).join('');

  if (!teams || !teams.length) {
    strHtmls = `
    <tr>
    <td>null</td>
    <td>null</td>
    <td></td>
    </tr>`
  }
  const table = document.querySelector('.team-list')
  table.classList.add('show')
  document.querySelector('.team-list tbody').innerHTML = strHtmls
}

async function doLogin() {
  const username = document.querySelector('.login .username').value;
  const password = document.querySelector('.login .password').value;
  if (!username || !password) {
    userMsg('Must enter Username and Password');
    return;
  }
  const res = await login({ username, password })
  if (res.type === 'Custom Message') userMsg(res.message);
  else if (res.isAdmin) {
    closeLogin()
    setUserToStorage(res)
    renderTeams()
  }
}

async function onRemoveTeam(teamId) {
  await removeTeam(teamId)
  renderTeams()
}


function userMsg(message = '') {
  document.querySelector('.user-msg h1').innerText = message;
  document.body.classList.add('open');
}

function closeMsg() {
  document.body.classList.remove('open');
}


function openLogin() {
  document.body.classList.add('open-login');

}
function closeLogin() {
  document.body.classList.remove('open-login');
}


//****************************************************************/
//****************************************************************/
//****************************************************************/


// SERVICE

const BASE_URL = 'http://localhost:3030';


async function postTeam(member1, member2, isForce) {
  const team = { member1, member2 };
  const res = await axios.post(`${BASE_URL}/team`, { team, isForce });
  return res.data;
}

async function getTeamsForDisplay() {
  const res = await axios.get(`${BASE_URL}/team`);
  return res.data;
}

async function removeTeam(teamId) {
  console.log('Lets remove');
  const res = await axios.delete(`${BASE_URL}/team/${teamId}`);
  return res.data;
}

async function login(payload) {
  const res = await axios.post(`${BASE_URL}/login`, payload);
  console.log('res:', res)
  return res.data;
}

function getUserFromStorage() {
  return JSON.parse(localStorage.getItem('loggedinUser'));
}

function setUserToStorage(val) {
  const value = JSON.stringify(val);
  localStorage.setItem('loggedinUser', value);
}