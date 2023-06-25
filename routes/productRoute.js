const express=require("express");
const router=express.Router();
const Product=require("../models/productModel");
const {isAuthenticatedUser,authorizeRoles}=require("../middlewares/auth");

//can also just get controller using below
//const productController=require("../controller/productController");
const { getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails } = require("../controllers/productController");



// const productRoute=express();
// productRoute.get('/products',productController.getAllProducts);

router.route("/products").get(getAllProducts)
router.route("/product/new").post(createProduct);
router.route("/home").get(function(req,res){
    res.send("hello");
}
)
// router.route("/product/:id").put(updateProduct);
router.route("/product/:id").put(updateProduct)
                            .delete(deleteProduct)
                            .get(getProductDetails);
module.exports=router;
//isAuthenticatedUser,authorizeRoles("admin"),