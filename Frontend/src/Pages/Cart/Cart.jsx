import React, { useContext } from 'react'
import './Cart.css'
import StoreContext from '../../Context/StoreContext'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cart = () => 
  {
    const navigate = useNavigate();
    const {cartItems,food_list,removeFromCart,getTotalCartAmount,currency,url,deliveryCharge} = useContext(StoreContext)
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0)
          {
            return(
            <div key={index} >
              <div className=' cart-items-item'>
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price*cartItems[item._id]}</p>
                <p className='delete'><MdDelete onClick={()=>removeFromCart(item._id)}/></p>
              </div>
              <hr />
            </div>
            )
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className='cart-total'>
        <h2>Cart Totals</h2>
        <div className='cart-main'>
           <div className='subtotal'>
               <p>Subtotal</p>
               <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='delivery-fee'>
               <p>Delivery Fee</p>
               <p>${getTotalCartAmount()==0?0:deliveryCharge}</p>
            </div>
            <hr />
            <div className='Total'>
               <p>Total</p>
               <p>${getTotalCartAmount()==0?0:getTotalCartAmount()+deliveryCharge}</p>
            </div>   
        </div>
        <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
           
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart
