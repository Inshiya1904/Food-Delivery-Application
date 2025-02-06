import React, { useContext, useState } from 'react'
import { FaCartPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import './nav.css'
import { Link, useNavigate } from 'react-router-dom';
import StoreContext from '../../Context/StoreContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { assets } from '../../assets/asset';
import profileicon from '../../assets/profile_icon.png'
import bagicon from '../../assets/bag_icon.png'
import logouticon from '../../assets/logout_icon.png'


const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("Home");
  const navigate = useNavigate();
  const { getTotalCartAmount,token,setToken,setCartItems} = useContext(StoreContext)
  const [showmenu, setShowMenu] = useState(false)
  
  const handlebuttonToggle = () => {
    setShowMenu(!showmenu)
  }
  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken("")
    setCartItems([])
    navigate('/')
  }
  return (
<div className="nav">
      <Link to='/'><h1 className='logo'>Zomato</h1></Link>
     
      <ul className={showmenu ? 'mobile-menu' : 'web-menu'}>
        <Link to='/' ><li><a href="" onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""} >Home</a></li></Link>
       <li> <a href='#ExploreMenu'  onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}> Menu</a></li>
       <li> <a href='#app-download' onClick={()=>setMenu("Mobile-App")} className={menu==="Mobile-App"?"active":""}>Mobile-App</a></li>
        <li><a href='#footer' onClick={()=>setMenu("Contact Us")} className={menu==="Contact Us"?"active":""}>Contact Us</a></li>
      </ul>
    <div className='Navbar_right'>
    <IoSearch  className='search_icon'/>
    <div className='cart_icon'>
    <FaCartPlus onClick={()=>navigate('/cart')} />
   
    <div className={getTotalCartAmount()===0?"":"dot"}></div>
    </div>
    {!token?<button className='btnsignup' onClick={()=>setShowLogin(true)}>Sign in</button>
    :
     <div className='navbar-profile'>
        <img src={profileicon} alt="" />
        <ul className="nav-profile-dropdown">
          <li><img src={bagicon} alt="" />
          <Link to='/myorders'><p>Orders</p></Link>
          </li>
          <hr />
          <li onClick={handleLogout}><img src={logouticon} alt="" />
          <p>Logout</p>
          </li>
        </ul>
     </div>}
    
    
    <div className='menubar' >
    <button onClick={handlebuttonToggle}>
    <GiHamburgerMenu />
    </button>
   
    </div>
    

    </div>
</div>
    
  )
}

export default Navbar
