const { default: mongoose } = require('mongoose');
const productModel = require('../../model/admin/product_model');

exports.createProduct = async (req,res) => {
    try {
        let {productName, productPrice, role, productImage} = req.body;
        let product = await productModel.findOne({productName: productName, isDelete: false});
        if(product){
            return res.json({message: "This Product already exists."});
        }

        let productpath;
        if(req.file){
            productpath = `${req.file.path}`
        }
        product = await productModel.create({
            admin: req.admin._id,
            productName,
            productPrice,
            role,
            productImage: productpath
        })
        product.save();
        res.json({product, message: "product added"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

exports.getAllProduct = async (req,res) => {
    try {
        let product = await productModel.find({admin: req.admin._id ,isDelete: false});
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

exports.specificProduct = async (req,res) => {
    try {
        let id = new mongoose.Types.ObjectId(req.query.productId);
        let product = await productModel.findOne({admin: req.admin._id ,_id: id, isDelete: false});
        if(!product){
            return res.json({message: "No Such Product Found"});
        }
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateProduct = async (req,res) => {
    try {
        let {productId, productName, productPrice, role, productImage} = req.body;
        let isAdmin = await productModel.findOne({admin: req.admin._id, isDelete: false});
        if(!isAdmin){
            return res.json({message: "you are not admin"})
        }
        let product = await productModel.findOne({_id: productId, isDelete: false});
        if(!product){
            return res.json({message: "No such product found!"});
        }

        let productpath;
        if(req.file){
            productpath = `${req.file.path}`
        }
        product = await productModel.findByIdAndUpdate(
            productId,
            {
                $set: {
                    productName: productName,
                    productPrice: productPrice,
                    role: role,
                    productImage: productpath
                }
            },
            {new: true}
        )
        product.save();
        res.json({product, message: "product updated"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Interal server error"});
    }
}

exports.deleteProduct = async (req,res) => {
    try {
        let {productId} = req.body;
        let product = await productModel.findOne({_id: productId, admin: req.admin._id ,isDelete: false});
        if(!product){
            return res.json({message: "No Such Product Found"});
        }
        product = await productModel.findByIdAndUpdate(
            productId,
            {
                $set: {isDelete: true}
            },
            {new: true}
        );
        res.json({product, message:"Deleted Successfully!"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}