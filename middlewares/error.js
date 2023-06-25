const ErrorHandler=require("../utils/errorhandler");

module.exports=(err,req,res,next)=>{
    //default setups
err.statusCode=err.statusCode||500;
err.message=err.message||'Internal Server Error';
   

//wrong mongodb id error
if(err.name=='CastError'){
    const message=`Resource not found.Invalid :${err.path}`;
    err= new ErrorHandler(message,400);
}

//mongoose duplicate key error
if(err.code==11000)
{
    const message=`Duplicate ${Object.keys(err.keyValue)} Enetred`
    err= new ErrorHandler(message,400);
}


//WRONG JWT ERROR
if(err.code=='JsonWebTokenError')
{
    const message=`JSON wEB TOKEN IS INVALID Try again`
    err= new ErrorHandler(message,400);
}
//JWT EXPIRE ERROR
if(err.code=='TokenExpiredError')
{
    const message=`Json web token is expired,try again`
    err= new ErrorHandler(message,400);
}
//This line sends a JSON response to the client with the HTTP status code and error message
req.status(err.statusCode).json({
    success:false,
    message:err.message,
})
};