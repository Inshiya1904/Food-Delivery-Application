import React, { useEffect, useState } from 'react'
import './ListItems.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';



const List = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
   console.log(response.data)
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])
 
  // delete food item
  const removeFood = async (FoodId) => {
    console.log(FoodId)
    const response = await axios.delete(`${url}/api/food/remove/${FoodId}`)
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

 
  

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <Link to={`/read/${item._id}`} ><button className='btn'>View</button></Link>
              <Link to={`/edit/${item._id}`} ><button className='btn'>Edit</button></Link>
              <button className='btn' onClick={() => removeFood(item._id)}>Delete</button>
              
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List

