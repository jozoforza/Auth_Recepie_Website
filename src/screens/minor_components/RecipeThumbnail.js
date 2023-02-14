import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from '../../redux/slicerReducers'
import ThumbnailLikes from './ThumbnailLikes'

import './css/recipeThumbnail.css'

const RecipeThumbnail = ({recipe,recipes,setRecipes, index, selectedLikes}) => {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  

  /* const [likesStyle, setLikeStyle] = useState({
    like: 'selectedLike',
    dislike: 'notSelectedLike'
  }) */

  const handleLike = async(likeStatement, recipe, e) => {
      const message = await axios.post(
        'http://localhost:4000/like/'+recipe,
         {
          like: likeStatement
         })
        alert(message.data)
  }


  const navigate = useNavigate()
  return (
    <div style={{borderStyle: "solid", margin: "1rem"}}>
            <h1>{recipe.name}</h1>
            <p>{recipe.info}</p>
            <p>{recipe.date}</p>
            <div><img src={'http://localhost:4000' + recipe.photo}></img></div>
            <button onClick={()=>{navigate('/recipe/'+recipe.recipe_id)}}><h1>See recipe</h1></button>
            <div>
                {/* <button className='selectedLike' onClick={(e)=>handleLike(1, recipe.recipe_id, e)}>{recipe.likes}👍</button>
                <button className='notSelectedLike' onClick={(e)=>handleLike(0, recipe.recipe_id, e)}>{recipe.dislikes}👎</button> */}
                <ThumbnailLikes recipe={recipe} setRecipes={setRecipes}/>
            </div>
    </div>
  )
}

export default RecipeThumbnail