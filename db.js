const uuid = require('uuid').v4
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("./data/main.db", (err) => {
    if(err)
    {
    console.log("Error Occurred - " + err.message);
    }else{
        console.log('sqlite connected')
    }
})
const recipeQuerry = `INSERT INTO 
recipes (recipe_id,user_id, name, photo, info, recipe, date, likes, dislikes, ingredients)
 VALUES(?,?,?,?,?,?,DATE(?),?,?,?)`
function insertRecipe(){
    id = parseInt(uuid(),16)
    return new Promise((resolve, reject) => {
        db.run(recipeQuerry ,[id,1, "hamburger", "/data/recipes_pics/adam.jpg", "eazy peazy hamburger recipe", JSON.stringify(["get ingredients", "roast meat", "serve with mayo"]),"2022-12-25",20,12,JSON.stringify(["tomato 200mg", "bread 300mg", "meat 300mg"]) ], (err , data) => {
            if(err){
                reject(new Error(err))      
            }else{
                resolve()
            }
            });
    })
} 

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

const findByIdQuery = 'SELECT * FROM users WHERE user_id=?;'
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

const userCreateQuery = `INSERT INTO users(username, email, password, profile_pic, bio) VALUES(?,?,?,?,?)
`
function dbCreateUser(data){
    return new Promise((resolve, reject) => {
        const values = [data.username, data.email, data.password, data.prof_pic, data.bio]
        db.run(userCreateQuery ,values, (err , data) => {
            if(err){
                reject(new Error(err))      
            }else{
                resolve()
            }
            });
    })
}

function dbFind(table,column, value){
    return new Promise((resolve, reject) => {
        const findQuerry = `SELECT * FROM ${table} WHERE ${column}=?`
        db.all(findQuerry ,[value], (err , data) => {
            if(err){
                reject(new Error(err))      
            }else{
                resolve(data[0])
            }
            });
    })
}

module.exports = {dbAll, dbFind, dbCreateUser,insertRecipe }