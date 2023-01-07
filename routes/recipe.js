const express = require('express')
const router = express.Router()
const path = require('path')
const {dbFind, dbRecipes, dbMyRecipes} = require('../db');
const { isLoggedIn } = require('../local_strategy');

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
    res.json({message: "bruh"})
  }
    
})


module.exports = router