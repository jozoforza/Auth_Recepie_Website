import React from 'react'
import {useNavigate} from 'react-router-dom';
import './mainProfileScreen.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from '../redux/slicerReducers'

const ProfileScreen = () => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={()=> navigate('/')}>back</button>
    {(user.password)?(
    <div>
      ProfileScreen
      <div>email: {user.email}</div>
    </div>):(<div>not authentificated</div>)}
    </div>
  )
}

export default ProfileScreen