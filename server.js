const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const session = require('express-session')
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
const http = require('http').createServer(app);

// app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
      origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
      credentials: true
  };
  app.use(cors(corsOptions));
}

// console.log('Process', process.env);

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