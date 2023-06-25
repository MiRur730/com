class ErrorHandler extends Error{ //class Errorhandler is inheriting from Error
    //when new instance of class is created constructor is called
    constructor(message,statusCode){
        //This line calls the constructor of the parent Error class and passes the error message as an argument.
        super(message);
        this.statusCode= statusCode

        Error.captureStackTrace(this,this.constructor);
       console.log(this.constructor.message)
    }
}
module.exports= ErrorHandler;