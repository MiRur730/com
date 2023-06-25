module.exports=theFunc=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next);
}
//this  will take functiona sthe parameter and resolve promise