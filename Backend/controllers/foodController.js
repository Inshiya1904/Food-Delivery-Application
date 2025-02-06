import foodModel from "../models/foodModel.js";
import fs from 'fs'
import multer from 'multer'

// creating apis for add,remove and get all food items
//add food item

const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`
   console.log(req.file.filename)
   const addFood = new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
   })
   try {
     
        await addFood.save();
        res.json({success:true,message:"Food Item Added Succesfully"})
   } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
   }
}

// get all food list
const getFoodlist = async(req,res) => {
     try {
          const getFoods = await foodModel.find({})
          res.json({success:true,data:getFoods})
     } catch (error) {
          console.log(Error)
          res.json({success:false,message:"Error"})
     }
}

// removefood item

const removeFood = async (req,res) => {
     try {
          const FoodId = req.params.id;
        const Findfood = await foodModel.findById({_id:FoodId})
            if(!Findfood)
            {
                return res.status(404).json({success:false,message:"No product found"})
            }
            else
            {
               fs.unlink(`uploads/${Findfood.image}`,()=>{})
                const deleteFood = await foodModel.findByIdAndDelete({_id:FoodId})
                console.log(deleteFood)
                return res.status(200).json({success:true,message:"Product Deleted Successfully",data:deleteFood})

            }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

// Update Food
const updateFood = async(req,res) => {
     try {
         const FoodId = req.params.id;
     //     let image_filename = `${req.file.filename}`
         const {name,description,price,category,image} = req.body
 
         const FindFood = await foodModel.findById({_id:FoodId})
             if(!FindFood)
             {
                 return res.status(404).json({success:false,message:"No product found"})
             }
             else
             {
                 const updateFoodItem = await foodModel.findByIdAndUpdate(
                     {_id:FoodId},
                     {name,description,price,category,image},
                     {new:true}
                 )
                 return res.status(200).json({success:true,message:"Product Updated Successfully",data:updateFoodItem})
 
             }
     } catch (error) {
         console.log(error)
         return res.status(500).json({success:false,message:"Internal server error"})
 
     }
 
 }

 // get fooditem by id
 const getFoodById = async (req,res) => {
     try {
          const FoodId = req.params.id;
        const Findfood = await foodModel.findById({_id:FoodId})
            if(Findfood)
            {
                return res.status(200).json({success:true,data:Findfood})
            }
            else
            {
                return res.status(404).json({success:false,message:"No product found"})

            }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}





export {addFood,getFoodlist,removeFood,updateFood,getFoodById}