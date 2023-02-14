import React, { useState, useEffect, } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import './css/mainScreen.css'
import RecipeThumbnail from '../minor_components/RecipeThumbnail';

const RecepiesList = () => {
    const navigate = useNavigate()
    const [loadingState, setLoadingState] = useState()
    const [recipes, setRecipes] = useState([])
    const [selectedLikes, setSelectedLikes] = useState({
      likes: [],
      dislikes: []
    })
    async function getRecipes(){
      try{
        const response = await axios.get('http://localhost:4000/recipes')
        console.table(response.data)
        let data = response.data
        setRecipes(data)
        
        setLoadingState(false)
      }catch(err){
        console.log(err)
      }
      
    }
    useEffect(()=>{getRecipes()},[]) 
  return (
    <div className='recepies'>
       {/* <div style={{background: 'orange', width: '600px', height: '100px'}}>al</div>
       <div style={{background: 'orange', width: '600px', height: '100px'}}>al</div>
       <div style={{background: 'orange', width: '600px', height: '100px'}}>al</div> */}
       {loadingState?<h2>loading...</h2>:
       (recipes.map((recipe, index)=>
          <RecipeThumbnail recipe={recipe} key={recipe.recipe_id+"_key"} setRecipes={setRecipes}/>
       ))}
    </div>
  )
}

export default RecepiesList