import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import Avatar from '../minor_components/Avatar'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from '../../redux/slicerReducers'
import {genRandonString} from '../../assets/avatarConfig'


const SignUp = () => {
  
  const [avatarPic, setAvatarPic] = useState('Aneka')
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [inputs, setInputs ] = useState({profile_pic: 'Aneka'})
    const navigate = useNavigate()
    //err message
    //form managment
    const handleAvatar = () =>{
      const seed = genRandonString(6)
      setAvatarPic(seed)
      handleChange({
        target: {
          name: 'profile_pic',
          value: seed
        }
      })
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

      const handleSubmit = async(event) => {
        event.preventDefault();
        if(inputs.password == inputs.mPassword){
        try{
          const response = await axios.post('http://localhost:4000/signUp', inputs)
          setMessage(response.data.message)
          if(response.data.user_id){
            dispatch(fetchUser(response.data))
            navigate('/profile')
            console.log(response.data)
            setInputs(prevState=>{
              return {profile_pic: prevState.profile_pic}
            })
          }
        }catch(err){
          console.error(err);
        }}else{
          setMessage('passwords must match')
        }
        
      }

  return (
    <div>
        <h2>Sign Up Page</h2>
        <p>profile pic:</p>
        <Avatar seed={avatarPic} size={'100px'}/>
        <p><button onClick={()=>handleAvatar()}>generate</button></p>
        <form onSubmit={handleSubmit}>
        <p>username:</p>
        <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}
        required/>
        <p>email:</p>

        <input 
        type="text" 
        name="email" 
        value={inputs.email || ""} 
        onChange={handleChange}
        required/>

        <p>password:</p>

        <input 
        type="text" 
        name="password" 
        value={inputs.password || ""} 
        onChange={handleChange}
        required/>

        <p>matching password:</p>

        <input 
        type="text" 
        name="mPassword" 
        value={inputs.mPassword || ""} 
        onChange={handleChange}
        required/>
        <div>
        <p>{message}</p>
        <input type="submit" value="signUp" />
        </div>
        </form>

        <p>dont have account?</p>
        <button onClick={()=> navigate('/logIn')}>login</button>
    </div>
  )
}

export default SignUp
