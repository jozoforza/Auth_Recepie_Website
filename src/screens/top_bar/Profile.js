import React from 'react'
import {useNavigate} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from '../../redux/slicerReducers'


const Profile = () => {
  const user = useSelector(selectUser)
  const navigate=useNavigate()
  const isAuthentificated = false
  
  const handleProfile = () => {
    if(!isAuthentificated){
      navigate('/logIn')
    }else{
    navigate('/profile')
  }}
  return (
    <div>
      <button onClick={handleProfile}>
        Sign in
      </button>
      {user.username?(<button onClick={()=> navigate('/profile')}>
        {user.username}
      </button>):(<p></p>)}
     
    </div>
  )
}

export default Profile