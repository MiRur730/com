const Product=require("../models/productModel");
const ErrorHandler=require('../utils/errorhandler');
const catchAsyncErrors=require("../middlewares/catchAsyncError");
const ApiFeatures=require("../utils/apifeatures")


///Create a new Product --ADMIN
exports.createProduct= async(req,res,next)=>{
    try{
        const {name,description,price,rating,images,category,Stock, numOfReviews,reviews}=req.body;
        const product = new Product({
            
            name,description,price,rating,images,category,Stock, numOfReviews,reviews,
          });
          const savedProduct = await product.save();
    
        // const product=await Product.create(req.body);
        res.status(201).json({
            success:true,
            savedProduct
        })
        
    }catch(err){
        console.log("Create Product Error");
        console.log(err);
    }
    
};

//get all product details
 //show page of each product
exports.getProductDetails=async(req,res,next)=>{
    try{
//req.params.id -returns value of parameter in the url
const product=await Product.findById(req.params.id);
if(!product){
    // return res.status(500).json({success:false,message:"Product not found"})
    return new ErrorHandler("Product not found",404);
}

res.status(200).json({success:true,product})
    }catch(err){
        console.log(err);
    }

 
};

//--------------------------------------------------------------------------------------------------------------------------------//
///Get all products
exports.getAllProducts=async(req,res)=>{
    try{
        const resultPerPage=5;
        //keeping count of number of products
         const productCount=await Product.countDocuments()
         
          // called a constructor
          //Apifeature has query and queryStr so query is Product.find() 
      const apiFeature= new ApiFeatures(Product.find(),req.query)
       .search()
       .filter()
       .pagination(resultPerPage)
       const products=await apiFeature.query;
       
       res.status(200).json(
          {
              success:true,
              products,
              productCount
          })
    }catch(err){
        console.log(err);
    }
   
}
;

//update a product--admin
// /products/:_id

exports.updateProduct = async (req,res,next)=>{
    try{
        let product = await Product.findById(req.params.id);

        if(!product){
           return new ErrorHandler('Product not found',404);
            //    return  res.status(404).json({
            //         success:false,
            //         message:"Product not found"
            //     })
        }
    
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true,
            message:"Product Updated Successfully",
            product
        })
    }catch(err){
        console.log(err);
    }

    

}
//PRODUCT DELETE

exports.deleteProduct=async(req,res,next)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(500).json({success:false,message:"Product not found"})
        }
       await product.deleteOne();
    
       res.status(200).json({success:true,message:"Product deleted successfully"})
    }catch(err){
        console.log(err);
    }
  

};
//could have directly done
// module.exports={
//     getallProducts,....
// }