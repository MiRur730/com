const ErrorHandler = require("../utils/errorhandler");
const jwt=require("jsonwebtoken");
// const catchAsyncErrors = require("./catchAsyncError");
const User=require("../models/userModel");


const isAuthenticatedUser=async(req,res,next)=>{


    try{
        const {token}=req.cookies;
        //token created using jwt.sign in jwttoken() has id tokensecret and expiration date
         if(!token){
            return new ErrorHandler("PLease login to access this resouce",401)
         }
    
    
         //---------------------------------------------------------------------------------------------------verify token  .verify(token,process.env.jwt_token) below
         const decodedData=jwt.verify(token,"mitali");
    //jwttoken has id
    //id made during jwt token
        req.user=await User.findById(decodedData._id);
        next();
    }catch(err){
        console.log(err);
    }
    
}

const authorizeRoles=(...roles)=>{
try{
    return (req,res,next)=>{
        //req.user.role refers to role mentioned in userModel
        if(!roles.includes(req.user.role)){
return new ErrorHandler(`Role: $(req.user.role) is not allowed to access this resource`,403);
        }
        next();
    }
}
  catch(err){
    console.log(err);
  }

}
module.exports={
    isAuthenticatedUser,authorizeRoles
}