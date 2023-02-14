const express = require('express');
var cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const {strategy, passportMiddle, signUpMiddle, isLoggedIn} = require('./local_strategy')
const app = express();
const {dbFind, insertRecipe, dbDel, handlelike, dbUpdate} = require('./db')
const {sessionConf} = require('./session_config')
const bodyParser = require('body-parser');
const path = require('path');
const date = require('./aditional_functions/get_current_date')
//routes
const user = require('./routes/user')
const recipe = require('./routes/recipe')

const recObject = {
  user_id: 2,
  name: "home made juice",
  photo: "/data/recipes_pics/adam.jpg",
  info: "juicy hamburger",
  recipe: ["get bread","add meat","serve with mayo"],
  date: date(),
  likes: 1000,
  dislikes: 30,
  ingredients: ["bread 100g", "mayo 200g", "human flesh 600g"]
}
/* insertRecipe(recObject).then(()=>{console.log('done')}) */
passport.use(strategy)
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});
passport.deserializeUser((id, done) => {
  dbFind('users', 'user_id', id)
  .then(user => done(null, user))
  .catch(err => console.log(err))});

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
app.use('/',recipe)


//routes
app.get('/', function(req, res) {
  res.render(path.join(__dirname, 'build', 'index.html'));
});


app.listen(process.env.PORT || 4000, () => {
    console.log('Listening on localhost:4000')
  })