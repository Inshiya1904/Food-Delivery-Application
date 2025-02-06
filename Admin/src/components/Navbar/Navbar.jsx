import React from 'react'
import './Navbar.css'
import profile from '../../assets/profile_image.png'
const Navbar = () => {
  return (
    <div className='nav'>
      <div className='left-nav'>
         <h1 className='logo'>Zomato</h1>
         <h4>Admin Panel</h4>
      </div>
      <div className="right-nav">
        <img className='profile' src={profile} alt="" />
      </div>
    </div>
  )
}

export default Navbar
