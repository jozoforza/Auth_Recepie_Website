import React from 'react'
import TopBar from '../top_bar/TopBar'
import RecepiesList from './RecepiesList'
import './css/mainScreen.css'

const MainScreen = () => {
  return (
    <div className='whole_thing'>
      <TopBar/>
      <div className='main_block'>
        <div className='search_title'>You have searched for ---</div>
        <RecepiesList/>
      </div>
    </div>
  )
}

export default MainScreen