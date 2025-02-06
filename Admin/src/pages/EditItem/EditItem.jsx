import React, { useEffect, useState } from 'react'
import './EditItem.css'
import axios from 'axios'
import { assets,url} from '../../assets/assets';

import { useNavigate, useParams } from 'react-router-dom'
const EditItem = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState(false)
      console.log(image)
      const [inputUser, setInputUser] = useState({
          name:"",
          description:"",
          price:"",
          category:""
      })

      const { id } = useParams();
    const fetchSingleFoodItem = async () => {
        const response = await axios.get(`${url}/api/food/list/${id}`)
       console.log(response.data)
       setInputUser(response.data.data)
      
    }
    useEffect(() => {
        fetchSingleFoodItem();
      }, [])


      const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
      setInputUser({...inputUser,[name]:value})
        console.log(name)
        console.log(value)
        console.log("data",inputUser)
    }
    const onSubmitHandler = async(e) => {
      e.preventDefault()
      console.log("data1",inputUser)
      const formData = new FormData();
      formData.append("name",inputUser.name)
      formData.append("description",inputUser.description)
      formData.append("category",inputUser.category)
      formData.append("price",Number(inputUser.price))
      formData.append("image",image)
      
      const response = await axios.put(`http://localhost:4000/api/food/update/${id}`,inputUser,image)
      console.log(response)
      if(response.status===200)
      {
        navigate('/list')
      }
      
  }
  return (
    <div>
      <div className='add'>
                  <form className='flex-col' onSubmit={onSubmitHandler}>
                      <div className='add-img-upload flex-col'>
                          <p>Upload image</p>
                          <label htmlFor="image">
                              <img src={image?URL.createObjectURL(image):`http://localhost:4000/images/` + inputUser.image} alt="" />
                              
                          </label>
                          <input onChange={(e)=>setImage(e.target.files[0])}  type="file"  id="image"   required />
                      </div>
                      <div className='add-product-name flex-col'>
                          <p>Product name</p>
                          <input onChange={onChangeHandler} value={inputUser.name}
                          name='name'  type="text" placeholder='Type here' required />
                      </div>
                      <div className='add-product-description flex-col'>
                          <p>Product description</p>
                          <textarea onChange={onChangeHandler} value={inputUser.description}
                          name='description' type="text" rows={6} placeholder='Write content here' required />
                      </div>
                      <div className='add-category-price'>
                          <div className='add-category flex-col'>
                              <p>Product category</p>
                              <select name='category' onChange={onChangeHandler} value={inputUser.category} >
                                  <option value="Salad">Select</option>
                                  <option value="Salad">Salad</option>
                                  <option value="Rolls">Rolls</option>
                                  <option value="Deserts">Deserts</option>
                                  <option value="Sandwich">Sandwich</option>
                                  <option value="Cake">Cake</option>
                                  <option value="Pure Veg">Pure Veg</option>
                                  <option value="Pasta">Pasta</option>
                                  <option value="Noodles">Noodles</option>
                                  <option value="Biryani">Biryani</option>
                                  <option value="Nonveg">Nonveg</option>
                              </select>
                          </div>
                          <div className='add-price flex-col'>
                              <p>Product Price</p>
                              <input onChange={onChangeHandler} value={inputUser.price}
                              type="Number" name='price' placeholder='Price' />
                          </div>
                      </div>
                      <button type='submit' className='add-btn' >Update Food</button>                  </form>
              </div>
    </div>
  )
}

export default EditItem
