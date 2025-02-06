import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { assets,url} from '../../assets/assets';

import './Read.css'
const Read = () => {

    const { id } = useParams();
    const [viewdata, setViewData] = useState([])
    const fetchSingleFoodItem = async () => {
        const response = await axios.get(`${url}/api/food/list/${id}`)
       console.log(response.data)
           if (response.data.success) {
            setViewData(response.data.data);
           }
           else {
             toast.error("Error")
           }
    }
    useEffect(() => {
        fetchSingleFoodItem();
      }, [])

  return (
    <div className='read-single-item'>
      <div className="left-side">
        <img src={`${url}/images/` + viewdata.image} alt="" />
      </div>
      <div className="right-side">
        <h2>{viewdata.name}</h2>
        <p>Price: {viewdata.price}</p>
        <p>Category: {viewdata.category}</p>
        <p>{viewdata.description}</p>
       
      </div>

      
    </div>
  )
}

export default Read
