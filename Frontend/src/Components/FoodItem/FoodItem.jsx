import React, { useContext, useEffect, useState } from 'react'
import './FoodItem.css'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import StoreContext from '../../Context/StoreContext';
import starRating from '../../assets/rating_starts.png'

const FoodItem = ({ id,name,image,price,description }) => {
 
  // const [itemCount, setItemCount] = useState(0);

  const {cartItems,addToCart,removeFromCart,url,currency} = useContext(StoreContext);

 

  return (
    
    <div className='food-item-container'>
      <div className='food-item-img-container'>
        <img src={`${url}/images/` + image} alt="" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
         <div className="name">
          <h4>{name}</h4>
         </div>
         <div className='rating'>
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaRegStar/>
         </div>  
        </div>
        <p className='food-item-desc'>{description}</p>
        <div className='price-add'>
        <p className="food-item-price">${price}</p>
        {
          !cartItems[id]
          ?<button className='add-to-cart'
          onClick={()=>addToCart(id)}
          >Add to Cart</button>
          :<div className='food-item-counter'>
          <FaMinus className='minus-icon' onClick={()=>removeFromCart(id)}/>
          <p>{cartItems[id]}</p>
          <FaPlus className='add-icon' onClick={()=>addToCart(id)} /> 
          </div>
        }
        </div>
        
      </div>
    </div>
  )
}

export default FoodItem
