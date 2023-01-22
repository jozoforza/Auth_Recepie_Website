import React from 'react'
import TopBar from '../top_bar/TopBar'
import RecepiesList from './RecepiesList'
import './css/mainScreen.css'
import axios from 'axios'
import Button from '../minor_components/Button'

import { useState, useEffect } from 'react'


const MainScreen = () => {
  async function handleClick(){
    try{
      const response = await axios.get('http://localhost:4000/getProfileInfo')
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }
  /* const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch('https://api.multiavatar.com/Biytdrytnd.svg')
      .then(response => {
        if (response.status === 200) {
          return response.blob();
        }
        throw new Error('Failed to load image');
      })
      .then(imageBlob => {
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageData(imageUrl);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); */

  
  return (
    <div className='whole_thing'>
      <button onClick={()=>handleClick()}>get infop</button>
      {/* <img src={imageData} alt="My Image" /> */}
      <div className='main_block'>
        <div className='search_title'>You have searched for ---</div>
        <RecepiesList/>
      </div>
    </div>
  )
}

export default MainScreen