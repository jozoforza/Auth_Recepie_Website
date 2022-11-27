import React from 'react'
import {useNavigate} from 'react-router-dom';

const Profile = () => {
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
    </div>
  )
}

export default Profile