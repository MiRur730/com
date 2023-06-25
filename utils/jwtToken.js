//create Tokena and saving in cookie
const jwt=require("jsonwebtoken");

//generating token while logging in
const sendToken=(user,statusCode,res)=>{
    try{
 //jwt.sign function created in userModel
 const token= user.getJWTToken(); //function created in userModel

 //option
 const options={
     maxAge: 2 * 60 * 60 * 1000,    //expires option is replaced iwth maxAge
     httpOnly:true,
 };
 res.status(statusCode).cookie("token",token,options).json({
     success:true,
     user,token
 })
    }catch(err){
        console.log(err);
    }

   
}
module.exports= sendToken;