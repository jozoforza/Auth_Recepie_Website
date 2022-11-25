const express = require('express');
var cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const {strategy, passportMiddle} = require('./local_strategy')
const app = express();
const {dbAddUser, findUserByEmail, findUserById} = require('./db')
const {sessionConf} = require('./session_config')


//passportjs
function isLoggedIn(request, response, done) {   if (request.user) {
  return done();
}
return response.redirect("/")
}

passport.use(strategy)
passport.serializeUser((user, done) => {
  console.log("serializing user")
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  console.log("deserializing user")
  findUserById(id)
  .then(user => done(null, user))
  .catch(err => console.log(err))
});

//middleware
app.use(cors())
app.options('*', cors());
app.use(session(sessionConf));
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());


findUserByEmail('kata').then(s => console.log(s))
//routes
app.get('/', function(req, res) {
  console.log('hit home page')
  res.send('home');
});
app.get('/auth',isLoggedIn, function(req, res) {
  res.send('hello tu kelo');
});
app.post('/user', function(req, res) {
  console.log('hit home user')
  console.log(req.body)
  res.send(`email: ${req.body.email}\npassword: ${req.body.password}`);
});

app.post('/login',passportMiddle,
  function(req, res) {
    console.log("final callback")
    try{
      console.log(req.user)
      res.json(req.user);
    }catch(err){
      console.log(err)
    }
  }
);

app.listen(4000, () => {
    console.log('Listening on localhost:4000')
  })