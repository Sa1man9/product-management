const Product=require('../models/Product')

exports.showProducts= async(req,res)=>{
    try {
        const products= await Product.find();
        res.status(200).json({
            success:true,
            products,
            message:"products fetched successfully"
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Products cannot be shown",
        })
    }
}

exports.addProduct= async(req,res)=>{
    try {

        const {name,image,price}=req.body;
        let product= new Product({name,image,price});
        product= await product.save();
        res.status(200).json({
            success: true,
            product,
            message:"product created successfully"
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        }) 
    }
}

exports.editProduct = async (req,res) =>{
    try {
        const {name, image,price}=req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {name,image,price},
            {new: true}
        );
        res.status(200).json({
            success:true,
            product,
            message:"product editted successfully"
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        }) 
    }
}

exports.deleteProduct= async (req,res)=>{

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"Product Deleted Successfully"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        }) 
    }
    await Product.findByIdAndDelete(req.params.id);

}