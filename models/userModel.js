const mongoose=require("mongoose");
const validator=require('validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const config=require("../config/config.env")
require("dotenv");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[30,"Name cannot excced 30 characters"],
        minLength:[3,"Name should have more than 3 characters "]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please Ener a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your Password"],
        minLength:[7,"Password should be greater than 7 characters"],
        select:false,
    },
    avatar:{ //no need of array only one image as for profile
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        },
        role:{
           type:String,
           default:"user" 
        },
        resetPasswordToken:String,
        resetPasswordExpire:Date,
           
        
    
});
//pre - so below function is done before saving usermodel
//hasing the password before saving it to the database
userSchema.pre("save",async function(next){
    try{
//so incase of updation it will again hash it
if(!this.isModified("password")){
    next();
  }
  this.password=await bcrypt.hash(this.password,10)
    }catch(err){
console.log(err);
    }
  
})

//JWT TOKEN //session 

userSchema.methods.getJWTToken=function(){
    try{
        return jwt.sign({id:this._id},"mitali",{
            expiresIn: '3d'
           })
    }catch(err){
        console.log(err);
    }
   
}

//compare password function 

userSchema.methods.comparePassword= async function(password)
{
    try{
        return  await bcrypt.compare(password,this.password);
    }catch(err){
        console.log(err);
    }
 
}
module.exports=mongoose.model('User',userSchema);