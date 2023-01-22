import React from 'react'
import './css/topBar.css'
import mainlogo from '../../images/food-svgrepo-com.svg'
import SearchBar from './SearchBar'
import Profile from './Profile'

const TopBar = () => {
  return (
    <nav className='top_bar'>
        <div className='left_bar'>
            <img src={mainlogo} style={{width: '50px',height: '50px'}}></img>
            <SearchBar/>
        </div>
        <Profile/>
    </nav>
  )
}

export default TopBar