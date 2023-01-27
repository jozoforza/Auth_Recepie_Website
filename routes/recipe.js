const express = require('express')
const router = express.Router()
const {dbFind, dbRecipes, dbMyRecipes, insertRecipe } = require('../db');
const { isLoggedIn } = require('../local_strategy');
const {upload}  = require('../file_uploud')
const uuid = require('uuid').v4
const date = require('../aditional_functions/get_current_date')


function generateRecipeId(req, res, next){
  const id = parseInt(uuid(),16)
  req.recipeId = id
  console.log(id)
  next()
}


router.post('/createRecipe',generateRecipeId,isLoggedIn, upload.single('image'), function (req, res) {
  const recipe  = {
    recipe_id: req.recipeId,
    user_id: req.user.user_id,
    name: req.body.name,
    photo: "/data/recipes_pics/" + req.recipeId + ".jpg",
    info: req.body.info,
    recipe: req.body.recipe,
    date: date(),
    ingredients: req.body.ingredients
  }
  insertRecipe(recipe)
  res.send("file uploaded")
})

router.get('/data/recipes_pics/:filename', (req, res) => {
    res.sendFile(process.env.PWD + '/data/recipes_pics/' + req.params.filename);
  });
router.get('/recipe/:id',(req,res)=>{
    id = parseInt(req.params.id)
    dbFind('recipes','recipe_id',id).then(recipe => {
        res.send(recipe)
    })
})
router.get('/recipes', (req, res) => {
    dbRecipes().then((data)=>{
        res.json(data)
    })
  });
router.get('/myRecipes',(req,res)=>{
  if(req.user){
    const myId = req.user.user_id
    dbMyRecipes(myId).then((data)=>{
      console.log(data)
      res.json(data)
    })
  }else{
    res.end()
  }
    
})



module.exports = router