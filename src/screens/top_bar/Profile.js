import React from 'react'
import {useNavigate} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from '../../redux/slicerReducers'
import axios from 'axios'
import Avatar from '../minor_components/Avatar'



const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const navigate=useNavigate()
  const isAuthentificated = false
  
  const handleProfile = () => {
    if(!isAuthentificated){
      navigate('/logIn')
    }else{
    navigate('/profile')
  }}
  const handleSignOut = async() =>{
   const response = await axios.post('http://localhost:4000/logout')
   console.log(response.data.message)
   dispatch(fetchUser({likes: []}))
   navigate('/')
  }
  return (
    <div>
      <button onClick={handleProfile}>
        Sign in
      </button>
      
      {user && user.username?(
        <div>
          <button onClick={()=> navigate('/profile')}>
            <Avatar size={'20px'} seed={user.profile_pic}/>
          </button>
          <button onClick={()=> handleSignOut()}>
          sign out
          </button>
        </div>
      ):(<p></p>)}
     
    </div>
  )
}

export default Profile