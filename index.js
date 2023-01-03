const express = require('express');
var cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const {strategy, passportMiddle, signUpMiddle, isLoggedIn} = require('./local_strategy')
const app = express();
const { dbAll, createUser, dbFind, insertRecipe} = require('./db')
const {sessionConf} = require('./session_config')
const bodyParser = require('body-parser');
const path = require('path');
//routes
const user = require('./routes/user')

passport.use(strategy)
passport.serializeUser((user, done) => {
  console.log("serializing user")
  done(null, user.user_id);
});
passport.deserializeUser((id, done) => {
  console.log("deserializing user")
  dbFind('users', 'user_id', id)
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
app.use(express.static(path.join(__dirname, 'build')));
app.use('/',user)

//routes
app.get('/', function(req, res) {
  res.render(path.join(__dirname, 'build', 'index.html'));
});
app.get('/data/recipes_pics/:filename', (req, res) => {
  res.sendFile(__dirname + '/data/recipes_pics/' + req.params.filename);
});
app.get('/Recepie/:id',(req,res)=>{
  id = req.params.id
  dbFind(recipes,recipe_id,id)
})


app.listen(4000, () => {
    console.log('Listening on localhost:4000')
  })