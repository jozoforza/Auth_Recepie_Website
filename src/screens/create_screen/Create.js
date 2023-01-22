import React from 'react'
import RecipeInput from './RecipeInput';
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from '../../redux/slicerReducers'
import Recipe from '../main_screen/Recipe';
import FormData from 'form-data';

const Create = () => {
    //redux
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    //navigation
    const navigate = useNavigate()
    //form info
    const [recipeArray, setRecipeArray] = useState(["apple"])
    const [ingredients, setIngredients] = useState(["ingredient"])
    let data = new FormData()
    const [inputs, setInputs ] = useState({})
    
    //err message
    const [message, setMessage] = useState('')
    //form managment
    const handleChange = (event) => {
      const valueName = event.target.name
      if(event.target.name === 'image'){
        data.append('image',event.target.files[0] )
      } else{
        const value = event.target.value
        setInputs(values => ({...values, [valueName]: value}))
      } 
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      Object.keys(inputs).forEach(key=>{
        data.append(key, inputs[key])
      })
      data.append('recipe', recipeArray)
      data.append('ingredients', ingredients)
      axios.post('http://localhost:4000/createRecipe', data, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
          alert('file uploaded successfuly');
          data  = new FormData()
          navigate('/profile')
      })
    }
  return (
    <div>
        <h1>Create</h1>

        <form onSubmit={handleSubmit}>
        <p>name:</p>

        <input 
        type="text" 
        name="name" 
        value={inputs.name || ""} 
        onChange={handleChange}/>

        <p>info:</p>

        <input 
        type="text" 
        name="info" 
        value={inputs.info || ""} 
        onChange={handleChange}/>

        <p>photo:</p>

        <input 
        type="file" 
        name="image" 
        onChange={handleChange}/>

        <p>Recipe</p>

        <RecipeInput inputArray={recipeArray} setInputArray={setRecipeArray}/>

        <p>ingerdients:</p>

        <RecipeInput inputArray={ingredients} setInputArray={setIngredients}/>
        
        <p>{message}</p>
        
        
        <input type="submit" value="create" />

        </form>
    </div>
  )
}

export default Create