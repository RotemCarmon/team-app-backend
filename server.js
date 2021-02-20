const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(bodyParser.json());
const http = require('http').createServer(app);

const teamService = require('./services/team.service.js')
const userService = require('./services/user.service.js')
const CustomMsg = require('./customMsg.js')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})


// TEAM
app.get('/team', async (req, res, next) => {
  try {
    const teams = await teamService.getTeamForDisplay();
    res.json(teams);
  } catch (err) {
    // console.log('Err', err);
    // res.status(400).send('Bad request - getting teams')
    next(err)
  }
})

app.post('/team', async (req, res, next) => {
  try {
    const { team, isForce } = req.body;
    // isForce will skip the verification process
    const result = await teamService.addTeam(team, isForce);
    // if (result instanceof CustomMsg) res.json(result)
    res.json(result);
  } catch (err) {
    if (err instanceof CustomMsg) res.status(err.statusCode()).json(err)
    else next(err)
    // res.status(400).send('Bad request - adding teams')
  }
})


// app.get('/team/:name', async (req, res, next) => {
//   try {
//     const { name } = req.params;
//     console.log('name:', name)
//     const teamByName = await teamService.getMemberByName(name);
//     const membersWhoChose = teamByName.map(team => team.member1)
//     res.json(membersWhoChose);
//   } catch (err) {
//     next(err)
//   }
// })

app.delete('/team/:id', async (req, res, next) => {
  console.log('DELETING????');
  try {
    const { id } = req.params;
    console.log('req.params:', req.params)
    const removedTeam = await teamService.removeTeam(id)
    res.json(removedTeam);
  } catch (err) {
    next(err)
  }
})

//USER
app.post('/login', async (req, res, next) => {
  console.log('DOING LOGIN!!!!!');
  try {
    const { username, password } = req.body;
    const result = await userService.login(username, password)
    res.json(result);
  } catch (err) {
    // console.log('err->>>>>>->>>>>>:', err)
    console.log('err instanceof CustomMsg', err instanceof CustomMsg);
    if (err instanceof CustomMsg) res.json(err)
    // if (err instanceof CustomMsg) console.log(err);
    // next(err)
  }
})



const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})