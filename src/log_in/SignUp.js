import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from '../redux/slicerReducers'

const SignUp = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [inputs, setInputs ] = useState({})
    const navigate = useNavigate()
    //err message
    //form managment
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
          if(response.data.password){
            dispatch(fetchUser(response.data))
            navigate('/profile')
            console.log(response.data)
          }
        }catch(err){
          console.error(err);
        }}else{
          setMessage('passwords must match')
        }
        setInputs({})
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <h2>Sign Up Page</h2>
        <p>username:</p>

        <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}/>
        <p>email:</p>

        <input 
        type="text" 
        name="email" 
        value={inputs.email || ""} 
        onChange={handleChange}/>

        <p>password:</p>

        <input 
        type="text" 
        name="password" 
        value={inputs.password || ""} 
        onChange={handleChange}/>

        <p>matching password:</p>

        <input 
        type="text" 
        name="mPassword" 
        value={inputs.mPassword || ""} 
        onChange={handleChange}/>
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
