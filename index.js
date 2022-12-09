const express = require('express');
var cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const {strategy, passportMiddle, signUpMiddle} = require('./local_strategy')
const app = express();
const {findUserByEmail, findUserById, dbAll, createUser} = require('./db')
const {sessionConf} = require('./session_config')
const bodyParser = require('body-parser');



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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.get('/', function(req, res) {
  console.log('hit home page')
  res.send('home');
});
app.get('/auth',isLoggedIn, function(req, res) {
  res.json({message: 'you are authorized'});
});
app.post('/signUp',signUpMiddle,passportMiddle, function(req, res) {
  console.log('hit sign up page')
  console.log(req.body)
  res.redirect('/auth');
});

app.post('/logout', function(req, res){
  req.logout(function(err) {
    if (err) { 
      console.log(err)
      return next(err); }
    
    res.redirect('/');
  });
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