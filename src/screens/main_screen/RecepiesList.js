import React, { useState, useEffect, } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import './css/mainScreen.css'

const RecepiesList = () => {
    const navigate = useNavigate()
    const [loadingState, setLoadingState] = useState(true)
    const [recipes, setRecipes] = useState([])
    async function getRecipes(){
      try{
        const response = await axios.get('http://localhost:4000/recipes')
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
        <div style={{borderStyle: "solid", margin: "1rem"}} key={recipe.recipe_id+"_key"}>
          <h1>{recipe.name}</h1>
          <p>{recipe.info}</p>
          <p>{recipe.date}</p>
          <div><img src={'http://localhost:4000' + recipe.photo}></img></div>
          <button onClick={()=>{navigate('/recipe/'+recipe.recipe_id)}}><h1>See recipe</h1></button>
        </div>
       ))}
    </div>
  )
}

export default RecepiesList