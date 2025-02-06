import {  useEffect, useState } from "react";
// import { food_list } from "../assets/asset";
import StoreContext from './StoreContext'
import axios from "axios";

const StoreContextProvider = (props) =>{

    const [cartItems, setCartItems] = useState([]);
    const[token, setToken] =  useState("");
    const url = "http://localhost:4000";
    const [food_list, setFoodList] = useState([])
    const currency = "₹";
    const deliveryCharge = 5;

    // add and remove item from cart
    const addToCart = async(itemId) =>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
        // if the token is available that means user is logged in
        if(token)
        {
            await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async(itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token)
            {
                await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}})
            }
    }
    
    useEffect(() => {
        console.log("cartItems",cartItems)
    },[cartItems])

   // cart total
   const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
        try {
          if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);
            totalAmount += itemInfo.price * cartItems[item];
        }  
        } catch (error) {
            console.log(error)
        }
        
    }
    return totalAmount;
}
// fetch food list from database
const fetchFoodList = async() => {
        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.data)
}

// save cart data in localstorage after reloading  
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

// local storage login data and cart data will save after reloading web page
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData({ token: localStorage.getItem("token") })
            }
        }
        loadData()
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        currency,
        deliveryCharge
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider