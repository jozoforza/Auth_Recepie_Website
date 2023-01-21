const express = require('express')
const router = express.Router()
const {dbFind, dbRecipes, dbMyRecipes} = require('../db');
const { isLoggedIn } = require('../local_strategy');
const {upload}  = require('../file_uploud')
const uuid = require('uuid').v4


function generateRecipeId(req, res, next){
  const id = parseInt(uuid(),16)
  req.recipeId = id
  next()
}


router.post('/createRecipe',generateRecipeId, upload.single('image'), function (req, res) {
  console.log(req.body)
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
      res.json(data)
    })
  }else{
    res.json([{
      id: 123,
      name: "hamburger",
      info: "jummy burger",
      date: "2022-02-12",
      photo: "/data/recipes_pics/adam.jpg"
    },{
      id: 456,
      name: "hamburger",
      info: "jummy burger",
      date: "2022-02-12",
      photo: "/data/recipes_pics/adam.jpg"
    },{
      id: 789,
      name: "hamburger",
      info: "jummy burger",
      date: "2022-02-12",
      photo: "/data/recipes_pics/adam.jpg"
    }])
  }
    
})



module.exports = router