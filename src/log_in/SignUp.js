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
    const [message, setMessage] = useState('')
    const [inputs, setInputs ] = useState({})
    const navigate = useNavigate
    //err message
    //form managment
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

      const handleSubmit = async(event) => {
        event.preventDefault();
        try{
          const response = await axios.post('http://localhost:4000/signUp', inputs)
          setMessage(response.data.message)
          if(response.data.password){
            navigate('/profile')
            console.log(response.data)
          }
        }catch(err){
          console.error(err);
        }
        setInputs({})
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <h2>Sign Up Page</h2>
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
        <div>
        <input type="submit" value="LogIN" />
        </div>
        </form>
        <p>dont have account?</p>
        <button>signUp</button>
    </div>
  )
}

export default SignUp
