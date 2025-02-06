import React from 'react'
import './ExploreMenu.css'
import { menu_List } from '../../assets/asset'

const ExploreMenu = ({category, setCategory}) => {
  
  return (
    <div className='ExploreMenu' id='ExploreMenu'>
    <h1>Explore our menu</h1>
    <p className='explore-menu-text'>Choose from a diverse menu featuring a detectable array of dishes crafted with the
        finest ingredients and culinary expertise. Our mission is to satisfy your craving and elevate your
        dining experience, one delicious meal at a time.</p>
      <div className='explore-menu-list'>
         {menu_List.map((item,index)=>{
          return (
            <div onClick={()=>setCategory(prev=>prev===item.manu_name?"All":item.manu_name)}
             key={index} className='explore-menu-list-item'>
             
                <img className={category===item.manu_name?"active":""} src={item.manu_image} alt="" />
                <p>{item.manu_name}</p>
            </div>
          )
         })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
