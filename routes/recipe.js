const express = require('express')
const router = express.Router()
const path = require('path')
const {dbFind, dbRecipes} = require('../db')

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


module.exports = router