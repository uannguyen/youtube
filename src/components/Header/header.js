import React from 'react';
import logo from '../../images/icon-youtube.png'
import SearchBar from './search'

const Header = (props) => {

  return (
    <div className='header'>
      <div className='header-container'>
        <div className='header-logo'>
          <img src={logo} alt='Logo' />
          <span>Youtube</span>
        </div>
        <div className='header-search'>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default Header