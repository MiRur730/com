const User=require("../models/userModel");
const ErrorHandler=require("../utils/errorhandler");
// const catchAsyncErrors=require("../middlewares/catchAsyncError");
const sendToken=require("../utils/jwtToken");

// const { reset } = require("nodemon");
//Regsiter a user
const registerUser= async(req,res)=>{
    try{
      const {name,email,password}=req.body;

      const user= new User({
        name,email,password,
        avatar:{
            public_id:"this is sample id",
            url:"jdhjshdg"
        }
      })    
      const savedUser = await user.save();
      
      
// //method of token from model called
// const token=user.getJWTToken();
// res.status(201).json({
//     success:true,
//     token,
// })
sendToken(savedUser,201,res);
//sending only single response which is already in sendToken function
    }
    catch(err){
        console.log("registerUserERRor");
        console.log(err);
    }
}


//LOGIN

const loginUser=async(req,res)=>{
    try{

        const {email,password}=req.body;

        if(!email || !password){
           return new ErrorHandler("please enter email and password",400)
        }
        console.log(email);
        //this is important becoz in userModel we have set select false for passowrd
       const user= await User.findOne({email}).select("+password");
       if(!user){
        console.log("No user Found");
           return new ErrorHandler("Inavlid email or password ",401);
           
       }
   
       const isPasswordMatched= user.comparePassword(password);
   
       if(!isPasswordMatched){
        console.log("No password matched");
           return new ErrorHandler("Invalid email or password",401)
       }
       sendToken(user,200,res);
       //single respnse only
    //    res.status(200).json({
    //        user
    //    })
    }catch(err){
        console.log("Login error")
        console.log(err);
        res.status(400).json({"Message":"Login error Internal Server Error"})
    }
    
};


const logoutUser=async(req,res,next)=>{
    try{
        res.cookie("token",null,{
            maxAge:new Date(Date.now()),
            httpOnly:true
        })
        
            res.status(200).json({
                success: true,
                message:"Logged out successfully"
            })
    }catch(err){
        console.log(err);
    }

}
module.exports={
    registerUser,loginUser,logoutUser
}