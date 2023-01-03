const uuid = require('uuid').v4
const {db} = require('./db')
var session = require('express-session');
const Store = require('express-sqlite3')(session);

const storeOptions = {
  db: './data/main.db', // Use SQLite3 in memory db.
  concurentDb: true, // Enable SQLite3 WAL.
};

// new MySQLStore({}, connection);
sessionConf = {
    genid: (req) => {
      return uuid() // use UUIDs for session IDs
    }, 
    saveUninitialized: true,
    secret: "your secret line of secretness",
    store: new Store(storeOptions),
    cookie: { maxAge: 60*60000 }, // value of maxAge is defined in milliseconds. 
  }
module.exports = {sessionConf}