import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './mainProfileScreen.css'
import RecipeThumbnail from '../minor_components/RecipeThumbnail'

const MyRecepies = () => {
    const navigate = useNavigate()
    const [loadingState, setLoadingState] = useState(true)
    const [myRecipes, setMyRecipes] = useState([])
    async function getRecipes(){
      try{
        const response = await axios.get('http://localhost:4000/myRecipes')
        console.log(response.data)
        setMyRecipes(response.data)
        setLoadingState(false)
      }catch(err){
        console.log(err)
      }
      
    }
    useEffect(()=>{getRecipes()},[]) 
  if (myRecipes.length === 0){
    return(
      <div>
        <p>No recipes</p>
      </div>
    )
  }else{
    return (
      <div className='recepies'>{myRecipes.map((recipe)=>
          <RecipeThumbnail recipe={recipe} key={recipe.recipe_id+"_myKey"} setRecipes={setMyRecipes}/>
          )}
      </div>
    )
    }
}

export default MyRecepies