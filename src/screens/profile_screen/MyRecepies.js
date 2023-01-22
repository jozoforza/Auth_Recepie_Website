import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './mainProfileScreen.css'

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
  return (
    <div className='recepies'>{myRecipes.map((recipe)=>
        <div style={{borderStyle: "solid", margin: "1rem"}} key={recipe.recipe_id+"_key"}>
          <h1>{recipe.name}</h1>
          <p>{recipe.info}</p>
          <p>{recipe.date}</p>
          <div><img src={'http://localhost:4000' + recipe.photo}></img></div>
          <button onClick={()=>{navigate('/recipe/'+recipe.recipe_id)}}><h1>See recipe</h1></button>
        </div>)}</div>
  )
}

export default MyRecepies