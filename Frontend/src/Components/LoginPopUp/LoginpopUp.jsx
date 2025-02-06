import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { ImCross } from "react-icons/im";
import StoreContext from '../../Context/StoreContext';
import axios from "axios"
import { toast } from 'react-toastify';

const LoginpopUp = ({setShowLogin}) => {

  const { url,setToken,token,setCartItems } = useContext(StoreContext)

  const [currentState, setCurrentState] = useState('Sign Up')
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value
    setData({...data, [name]:value})
    // console.log(name)
    // console.log(value)
    // console.log(data)
  }

  useEffect(() =>{
    console.log(data)
  },[data])

  const onLogin = async(e) => {
    e.preventDefault()
    let newUrl = url
    if(currentState==="Login")
    {
      newUrl += "/api/user/login"
     
    }
    else
    {
      newUrl += "/api/user/register"

    }

    const response = await axios.post(newUrl,data)
    if(response.data.success)
    {
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
      console.log("Data",data)
    }
    else
    {
      alert(response.data.message)
    }
   
  }
  return (
    <div className='login-popup'>
      <form action="" onSubmit={onLogin}
       className="login-popup-container">
        <div className="login-pop-up-title">
          <h2>{currentState}</h2>
          <ImCross onClick={()=>setShowLogin(false)}/>
        </div>
        <div className="login-popup-inputs">
        {currentState==='Sign Up'?<input type="text" 
         name='name' onChange={onChangeHandler} value={data.name} 
        placeholder='Your Name' required/>:<></>}
          <input type="email" placeholder='Your Email'
          name='email' onChange={onChangeHandler} value={data.email}  required/>
          <input type="password" placeholder='Your Password'
          name='password' onChange={onChangeHandler} value={data.password}  required/>
          </div>
        <button>{currentState==='Sign Up'?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState==='Sign Up'
        ?<p className='pra'>Already have an account? <span onClick={()=>setCurrentState('Login')} >Login here</span></p>
        :<p className='pra'>Create a new account? <span onClick={()=>setCurrentState('Sign Up')} >Click here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginpopUp
