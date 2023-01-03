const LocalStrategy = require("passport-local").Strategy;
const { dbFind, dbCreateUser} = require('./db')
const passport = require('passport');
const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10).then((res)=>resolve(res))
  })
}

const strategy = new LocalStrategy(
    {
       usernameField: "username",
       passwordField: "password",
    },
    async function(username, password, done) {
      try{
        const results = await dbFind("users", "username", username)
        const isMatch = await bcrypt.compare(password, results.password);
        if (!results){
            return done(null, false, { message: "User does not exist" });
        }if (!isMatch){
            return done(null, false, { message: "Password is not valid." });
        }
        console.log("found and verified user")
        return done(null, results);
      }catch(err){
        console.log(err)
      }
    }  
  )

  function isLoggedIn(request, response, done) {   if (request.user) {
    return done();
  }
  return response.redirect("/")
  }

function passportMiddle(req, res, next){
    passport.authenticate("local",
    function(err, user, info){
    if (err){
      return next(err)
    }
    if (info){
        return res.json(info)
    }
    
    req.login(user, next)
    })(req, res, next);
}

function signUpMiddle(req, res, next){
      dbFind('users','email',req.body.email).then(email => {
        if(email){
          res.json({message: "user already exist"})
          res.end()
        }else{
          hashPassword(req.body.password).then(hashedPassword =>{
            console.log(req.body.password+": "+hashedPassword)
            dbCreateUser({
              email: req.body.email,
              password: hashedPassword,
              username: req.body.username,
              prof_pic: 'abc',
              bio: "im a web developer who likes cooking"}).then(
              success => {
                next()
              }
            ).catch(err=> console.log(err))
          })      
        }
})           
}

module.exports = {strategy, passportMiddle, signUpMiddle, isLoggedIn}