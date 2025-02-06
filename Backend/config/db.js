import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://sonashekhu09:Inshiya7867@cluster0.mzj0s.mongodb.net/food-delivery')
        console.log("Connected to Database")
    } catch (error) {
        console.log(error)
    }
}

