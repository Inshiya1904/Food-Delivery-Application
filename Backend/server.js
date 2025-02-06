import  express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config

const app = express()
const port = process.env.PORT || 4000

// middleware //
app.use(express.json()) // whenevr we get any request from frontend to backend we can parse using this middleware
app.use(cors()) // using this we can access back from frontend

// db connection
connectDB()

// api endpoints
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send('hello')
})



app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})

// mongodb+srv://sonashekhu09:Inshiya7867@cluster0.mzj0s.mongodb.net/?