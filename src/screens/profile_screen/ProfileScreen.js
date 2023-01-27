import React from 'react'
import {useNavigate} from 'react-router-dom';
import './mainProfileScreen.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from '../../redux/slicerReducers'
import MyRecepies from './MyRecepies';


const ProfileScreen = () => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={()=> navigate('/')}>back</button>
    {(user && user.password)?(
    <div>
      <h1>ProfileScreen</h1>
      <div>email: {user.email}</div>
      <div>username: {user.username}</div>
      <div>bio: {user.bio}</div>
      <button onClick={()=>{navigate('/create')}}>CREATE RECIPE</button>
      <MyRecepies/>
    </div>)
    :(<div>not authentificated</div>)}
      
    </div>
  )
}

export default ProfileScreen