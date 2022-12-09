const LocalStrategy = require("passport-local").Strategy;
const {findUserByEmail, createUser} = require('./db')
const passport = require('passport');

const strategy = new LocalStrategy(
    {
       usernameField: "email",
       passwordField: "password"
    },
    async function(email, password, done) {
      try{
        const results = await findUserByEmail(email)
        if (!results){
            return done(null, false, { message: "User does not exist" });
        }if (results.password !== password){
            return done(null, false, { message: "Password is not valid." });
        }
        console.log("found and verified user")
        return done(null, results);
      }catch(err){
        console.log(err)
      }
    }  
  )

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
      findUserByEmail(req.body.email).then(email => {
        if(email){
          res.send("user already exists")
          res.end()
        }else{
          createUser(req.body.email, req.body.password).then(
            success => {
              next()
            }
          ).catch(err=> console.log(err))
                
        }
})           
}

module.exports = {strategy, passportMiddle, signUpMiddle}