import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// create jwt token
const createToken = (id) => {

    return jwt.sign({id},process.env.JWT_SECRET)
}

// Register user api
const RegisterUser  = async(req,res) => {

const {name,email,password} = req.body
    try {
        //check if user already exists
        const userExist = await userModel.findOne({email});
            if(userExist)
            {
                return res.json({success:false,message:"User already exists"})
            }
           // validating emailformate an strong password
           if(!validator.isEmail(email))
           {
                return res.json({success:false,message:"Please enter valid email"})
           }
           // checking password lenght
           if(password.length<8)
           {
            return res.json({success:false,message:"Please enter a strong password"})
           }
           // hashing user password
           const salt = await bcrypt.genSalt(10)
           const hashPassword = await bcrypt.hash(password,salt);
           //creating new user
           const newUser = new userModel({
            name:name,
            email:email,
            password:hashPassword
           })

         const user = await newUser.save()
           const token = createToken(user._id)
           res.json({success:true,message:"User Register Successfully",user:user,token})
            // message:"User Register Successfully",user:newUser})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Internal Server Error"})
    }
}

// login user api
const loginUser = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user)
        {
            res.json({success:false,message:"User not found"})
        }
        const matchPassword = await bcrypt.compare(password,user.password)
        if(!matchPassword)
        {
            res.json({success:false,message:"Invalid Credential"})
        }

        const token = createToken(user._id)
        res.json({success:true,message:"User login successfully", user:user,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Internal Server Error"})
    }
}

export {loginUser,RegisterUser}