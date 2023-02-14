import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUser,
  selectUser
} from '../../redux/slicerReducers'

const LogIn = () => {
    //redux
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    //navigation
    const navigate = useNavigate()
    //form info
    const [inputs, setInputs ] = useState({})
    //err message
    const [message, setMessage] = useState('')
    //form managment
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

      const handleSubmit = async(event) => {
        event.preventDefault();
        try{
          const response = await axios.post('http://localhost:4000/login', inputs)
          setMessage(response.data.message)
          if(response.data.username){
            navigate('/profile')
            dispatch(fetchUser(response.data))
            console.log(user)
          }
        }catch(err){
          console.error(err);
        }
        setInputs({})
      }
  return (
    <div>
        <button onClick={()=> navigate('/')}>back</button>
        <form onSubmit={handleSubmit}>
        <h2>Log In Page</h2>
        <p>username:</p>

        <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}/>

        <p>password:</p>

        <input 
        type="text" 
        name="password" 
        value={inputs.password || ""} 
        onChange={handleChange}/>
        <p>{message}</p>
        <div>
        <input type="submit" value="LogIN" />
        </div>
        </form>
        <p>dont have account?</p>
        <button onClick={()=> navigate('/signUp')}>signUp</button>
    </div>
  )
}

export default LogIn