import React from 'react'
import './mainProfileScreen.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from '../redux/slicerReducers'

const ProfileScreen = () => {
  const user = useSelector(selectUser)

  return (
    <div>
    {(user.password)?(
    <div>
      ProfileScreen
      <div>email: {user.email}</div>
    </div>):(<div>not authentificated</div>)}
    </div>
  )
}

export default ProfileScreen