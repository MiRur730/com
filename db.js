const mongoose = require("mongoose");
const mongourl="mongodb://127.0.0.1:27017/eco";

const connectToMongo=async()=>{
    try{
        mongoose.set('strictQuery', false)
        mongoose.connect(mongourl);
        console.log("Connected To mongoDB")
    }
    catch(err){
        console.log(err);
        console.log("Couldnt Connect To MongoDb: MongoConnection Error")

    }
}

module.exports = connectToMongo;
