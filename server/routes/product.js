const express=require('express')
const router=express.Router();

const{showProducts, addProduct,editProduct,deleteProduct}=require('../controller/Product')

const {auth,isAdmin,isUser}=require("../middleware/auth")

router.get('/',auth,showProducts);
router.post('/', auth,isAdmin,addProduct);
router.put('/:id', auth,isAdmin,editProduct)
router.delete('/:id',auth,isAdmin,deleteProduct)

module.exports=router;