import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Footer from './Components/Footer/Footer';
import LoginpopUp from './Components/LoginPopUp/LoginpopUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './Pages/Verify/Verify';
import MyOrders from './Pages/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

 return (
  <>
  <ToastContainer />
  {showLogin?<LoginpopUp setShowLogin={setShowLogin}/>:<></>}
  <div className='app'>
      <BrowserRouter>
      <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home  />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>

        </Routes> 
      </BrowserRouter>
    </div>
    <Footer/>
  </>
    
    
  )
}

export default App
