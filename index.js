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
const date = require('./aditional_functions/get_current_date')
//routes
const user = require('./routes/user')
const recipe = require('./routes/recipe')

/* [id,1, "hamburger", "/data/recipes_pics/adam.jpg",
 "eazy peazy hamburger recipe",
  JSON.stringify(["get ingredients",
   "roast meat", "serve with mayo"]),
   "2022-12-25",20,12,
   JSON.stringify(["tomato 200mg", "bread 300mg", "meat 300mg"]) ]

   user_id, name, photo, info,
    recipe, date, likes, dislikes, ingredients
   */

const recObject = {
  user_id: 1,
  name: "salad",
  photo: "/data/recipes_pics/adam.jpg",
  info: "juicy hamburger",
  recipe: ["get bread","add meat","serve with mayo"],
  date: date(),
  likes: 1000,
  dislikes: 30,
  ingredients: ["bread 100g", "mayo 200g", "human flesh 600g"]
}

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
app.use('/',recipe)


//routes
app.get('/', function(req, res) {
  res.render(path.join(__dirname, 'build', 'index.html'));
});


app.listen(4000, () => {
    console.log('Listening on localhost:4000')
  })