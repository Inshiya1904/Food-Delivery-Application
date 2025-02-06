import React, { useState } from 'react'
import './AddItem.css'
import { assets,url} from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';


const Add = () => {
    // const url = "http://localhost:4000";
    const [image, setImage] = useState(false)
    console.log(image)
    const [data, setData] = useState({
        name:"",
        description:"",
        price:"",
        category:""
    })
   
    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData({...data,[name]:value})
        console.log(name)
        console.log(value)
        console.log("data",data)
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault()
        console.log("data1",data)
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("category",data.category)
        formData.append("price",Number(data.price))
        formData.append("image",image)
        // setData({name:"",description:"",category:"",price:""})
        //  setImage(false)
         console.log(formData)
        
        // send data to DB on submit
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success)
        {
            setData({name:"",description:"",category:"",price:""})
            setImage(false)
            toast.success(response.data.message)
            console.log(response)
        }
        else
        {
            toast.success(response.data.message)
        }
       
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                        
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image" hidden  required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name}
                    name='name'  type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description}
                    name='description' type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} value={data.category} >
                            <option value="Select">Select</option>
                            <option value="Salad">Salad</option>
                            <option value="Biryani">Biryani</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Nonveg">Nonveg</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price}
                        type="Number" name='price' placeholder='Price' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add
