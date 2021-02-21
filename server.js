const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const session = require('express-session')
const bcrypt = require('bcrypt')
const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
const http = require('http').createServer(app);

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

const teamRoutes = require('./api/team/team.routes')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')

app.use('/api/team', teamRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})