import React from 'react'
import TopBar from '../top_bar/TopBar'
import RecepiesList from './RecepiesList'
import './css/mainScreen.css'
import axios from 'axios'

const MainScreen = () => {
  async function handleClick(){
    try{
      const response = await axios.get('http://localhost:4000/getProfileInfo')
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className='whole_thing'>
      <button onClick={()=>handleClick()}>get infop</button>
      <div className='main_block'>
        <div className='search_title'>You have searched for ---</div>
        <RecepiesList/>
      </div>
    </div>
  )
}

export default MainScreen