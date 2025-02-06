import express from 'express'
import { addFood, getFoodById, getFoodlist, removeFood, updateFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router()

// Image storage engine
const fileStorage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`) // using this file name get unique
    }
})

const uploadImage = multer({storage:fileStorage})


foodRouter.post('/add',uploadImage.single('image'),addFood)
foodRouter.get('/list',getFoodlist)
foodRouter.delete('/remove/:id',removeFood)
foodRouter.put('/update/:id',updateFood)
foodRouter.get('/list/:id',getFoodById)



export default foodRouter