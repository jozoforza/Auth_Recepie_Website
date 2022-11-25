const mysql = require('mysql');
require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database: 'EATHUB'
});

    function dbAddUser(userObject){
      return new Promise(function(resolve, reject){
        connection.query(
          `INSERT INTO users(email,password) 
          VALUES('${userObject.email}','${userObject.password}')`, 
            function(err, results, fields){                                                
                if(err){
                    reject(new Error(err));
                }else{
                    resolve(results);
                }
            }
        )}
    )}
    function findUserByEmail(value){
      return new Promise(function(resolve, reject){
        connection.query(
          `SELECT * FROM users WHERE email=${mysql.escape(value)}`, 
            function(err, results, fields){                                                
                if(err){
                    reject(new Error(err));
                }else{
                    resolve(results[0]);
                }
            }
        )}
    )}
    function findUserById(id){
      return new Promise(function(resolve, reject){
        connection.query(
          `SELECT * FROM users WHERE id=${mysql.escape(id)}`, 
            function(err, results, fields){                                                
                if(err){
                    reject(new Error(err));
                }else{
                    resolve(results[0]);
                }
            }
        )}
    )}


module.exports = {dbAddUser, findUserByEmail, findUserById, connection}