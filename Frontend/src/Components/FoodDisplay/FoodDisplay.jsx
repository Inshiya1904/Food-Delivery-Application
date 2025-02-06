import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import StoreContext from '../../Context/StoreContext'

const FoodDisplay = ({category}) => {

  // get the item 
    const { food_list } = useContext(StoreContext)
    // console.log(food_list)



  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item,index) => {
          if(category==="All" || category===item.category)
          {
            return <FoodItem key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
                category={item.category}
            />
          }
            
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
