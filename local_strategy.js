const LocalStrategy = require("passport-local").Strategy;
const {dbAddUser, findUserByEmail} = require('./db')
const passport = require('passport');
const { request } = require("express");

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

module.exports = {strategy, passportMiddle}