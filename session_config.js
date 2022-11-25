const uuid = require('uuid').v4
const {connection} = require('./db')
var session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

sessionStore = new MySQLStore({}, connection);

sessionConf = {
    genid: (req) => {
      return uuid() // use UUIDs for session IDs
    }, 
    saveUninitialized: true,
    secret: "your secret line of secretness",
    store: sessionStore,
    cookie: { maxAge: 60*60000 }, // value of maxAge is defined in milliseconds. 
  }
module.exports = {sessionConf}