
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("./data/users.db", (err) => {
    if(err)
    {
    console.log("Error Occurred - " + err.message);
    }else{
        console.log('sqlite connected')
    }
})


const selectQuery = 'SELECT * FROM users;'
function dbAll(){
    return new Promise((resolve, reject) => {
        db.all(selectQuery , (err , data) => {
            if(err){
                reject(new Error(err))      
            }else{
                resolve(data)
            }
            });
    })
}

const findByIdQuery = 'SELECT * FROM users WHERE id=?;'
function findUserById(id){
    return new Promise((resolve, reject) => {
        db.all(findByIdQuery ,[id], (err , data) => {
            if(err){
                reject(new Error(err))      
            }else{
                resolve(data[0])
            }
            });
    })
}

const findByEmailQuery = 'SELECT * FROM users WHERE email=?;'
function findUserByEmail(email){
    return new Promise((resolve, reject) => {
        db.all(findByEmailQuery ,[email], (err , data) => {
            if(err){
                reject(new Error(err))      
            }else{
                resolve(data[0])
            }
            });
    })
}
const createUserQuery = `INSERT INTO users(email, password) VALUES(?,?)`
function createUser(email, password){
    return new Promise((resolve, reject) => {
        db.run(createUserQuery ,[email, password], (err , data) => {
            if(err){
                reject(new Error(err))      
            }else{
                resolve()
            }
            });
    })
}
module.exports = {createUser, findUserByEmail, findUserById,dbAll}