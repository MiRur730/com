const connectToMongoose=require("./db");
const express = require("express");
const cookieparser = require("cookie-parser");
var cors=require("cors");
connectToMongoose();

const app= express();
app.use(express.json());
app.use(cors())
app.use(cookieparser);


//Routing shuru
app.use("/api/products",require('./routes/productRoute'));
app.use("/api/users",require('./routes/userRoute'));

app.listen(5000,()=>{
    console.log("listening on PORT 5000");
})