const express=require("express");
const userRoute=express();
const userController=require("../controllers/userController");
const bodyparser=require("body-parser");
const {isAuthenticatedUser}=require("../middlewares/auth");

userRoute.post("/register",userController.registerUser);
userRoute.post("/login",userController.loginUser)
userRoute.get("/logout",userController.logoutUser)
module.exports= userRoute;