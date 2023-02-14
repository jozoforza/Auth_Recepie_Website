import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchUser,
  selectUser,
  addLike
} from '../../redux/slicerReducers'
import './css/recipeThumbnail.css'
import axios from 'axios'
import { getValue } from '@testing-library/user-event/dist/utils'

const ThumbnailLikes = ({recipe, setRecipes}) => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [likeClass,setLikeClass] = useState({
        likes: 'notSelectedLike',
        dislikes: 'notSelectedLike'
    })
    function checkSelected(){
        if(!user.user_id){
            return
        }else{
           user.likes.map(like=>{
                if(like.recipe_id === recipe.recipe_id){
                    let valueName = 'likes'
                    if (like.rating === 0){
                        valueName = 'dislikes'
                    }
                    setLikeClass(prevState=>{return {...prevState,[valueName]: 'selectedLike'}})
                }
           })
        }
    }
    useEffect(()=>{checkSelected()},[])

    const handleLike = async(likeStatement, recipe_id, e) => {
        if(!user.user_id){return navigate('/logIn')}
        const response = await axios.post(
          'http://localhost:4000/like/'+recipe_id,
           {
            like: likeStatement
           })
        if(response.data.err){
            return alert('unsuccessful')
        }
        const action = response.data.action
        //updates user likes
        dispatch(addLike({
            recipe_id: recipe_id,
            rating: likeStatement,    
        }))
        //set style class of likes
        let valueName = likeStatement?'likes':'dislikes'
        let oppositeValueName = likeStatement?'dislikes':'likes'
        setLikeClass({
            [oppositeValueName]: 'notSelectedLike',
            [valueName]: action == 'cancel'?'notSelectedLike':'selectedLike'
        })
        setRecipes(prevState=>{
            const newState = prevState.map(item=>{
                if(item.recipe_id === recipe_id){
                    switch(action){
                        case 'cancel':
                            console.log("canceling")
                            item[valueName] = recipe[valueName] - 1
                            break
                        case 'change':
                            console.log("changing")
                            item[valueName] = recipe[valueName] + 1
                            item[oppositeValueName] = recipe[oppositeValueName] - 1
                            break
                        case 'add':
                            console.log("adding")
                            item[valueName] = recipe[valueName] + 1
                            break
                    }
                }
                    return item
            })
            return newState
        })
    }

  return (
    <div>
        <button className={likeClass.likes} onClick={(e)=>handleLike(1, recipe.recipe_id, e)}>{recipe.likes}👍</button>
        <button className={likeClass.dislikes} onClick={(e)=>handleLike(0, recipe.recipe_id, e)}>{recipe.dislikes}👎</button>
    </div>
  )
}

export default ThumbnailLikes