import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const LogIn = () => {

    const [inputs, setInputs ] = useState({})
    const [message, setMessage] = useState('')
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

      const handleSubmit = async(event) => {
        event.preventDefault();
        alert(`email: ${inputs.email}\npassword: ${inputs.password}`);
        try{
          const response = await axios.post('http://localhost:4000/login', inputs)
          console.log(response.data)
        }catch(err){
          console.error(err);
        }
        
          /* .then(function (response) {
            console.log(response.data)
            setMessage(response.data.message)
          })
          .catch(function (error) {
            setMessage('username or password is wrong')
          }); */
        setInputs({})
      }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <h2>Log In Page</h2>
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
        <p>{message}</p>
        <div>
        <input type="submit" value="LogIN" />
        </div>
        </form>
        <p>dont have account?</p>
        <button>signUp</button>
    </div>
  )
}

export default LogIn