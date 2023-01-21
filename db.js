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
function insertRecipe(recipe){
    return new Promise((resolve, reject) => {
        const id = parseInt(uuid(),16)
        db.run(recipeQuerry ,[recipe.id,recipe.user_id, recipe.name, recipe.photo, recipe.info, JSON.stringify(recipe.recipe),recipe.date,recipe.likes,recipe.dislikes,JSON.stringify(recipe.ingredients) ], (err , data) => {
            if(err){
                reject(new Error(err))      
            }else{
                resolve()
            }
            });
    })
} 

const selectQuery = 'SELECT * FROM recipes;'
function dbRecipes(){
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
const myRecipesQuerry = `select * from recipes where user_id=?`
function dbMyRecipes(user_id){
    return new Promise((resolve, reject) => {
        db.all(myRecipesQuerry, [user_id], (err,data)=>{
            if(err){
                reject(new Error(err))
            }else{
                resolve(data)
            }
        })
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
        const findQuerry = `SELECT * FROM ${table} WHERE ${column}=? LIMIT 1;`
        db.all(findQuerry ,[value], (err , data) => {
            if(err){
                reject(new Error(err))      
            }else{
                resolve(data[0])
            }
            });
    })
}

module.exports = { dbRecipes, dbFind, dbCreateUser,insertRecipe, dbMyRecipes }