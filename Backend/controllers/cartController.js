import userModel from '../models/userModel.js'



// add item to user cart

const addToCart = async (req,res) => {
  try {
    const userData = await userModel.findById({_id:req.body.userId})
    // extract cart data from userData
    const cartData = await userData.cartData
    if(!cartData[req.body.itemId])
    {
        cartData[req.body.itemId] = 1
    }
    else
    {
        cartData[req.body.itemId] += 1
    }

    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"Added to cart"})

  } catch (error) {
    console.log(error)
        res.json({success:false,message:"Internal server error"})

  }
}




// remove item to user cart

const removeFromCart = async (req,res) => {
    try {
        const userData = await userModel.findById({_id:req.body.userId})
        // extract cart data from userData
        const cartData = await userData.cartData
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId] -= 1
        }
        
    
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Remove from cart"})
    
      } catch (error) {
        console.log(error)
            res.json({success:false,message:"Internal server error"})
    
      }
}

// fetch User cart data

const getCart = async (req,res) => {
    try {
        const userData = await userModel.findById(req.body.userId)
        const cartData = await userData.cartData
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
            res.json({success:false,message:"Internal server error"})
    }
}

export {addToCart,removeFromCart,getCart}