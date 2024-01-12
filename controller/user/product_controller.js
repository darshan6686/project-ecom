const productModel = require('../../model/admin/product_model');

exports.showAllProduct = async (req,res) => {
    try {
        let allProduct = await productModel.find({isDelete: false});
        res.json(allProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.specificProduct = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let product = await productModel.findOne({_id: cartItem, isDelete: false});
        if(!product){
            return res.json({message:"This Product Is Not Found!"})
        }
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}