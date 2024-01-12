const productModel = require('../../model/admin/product_model');
const cartModel = require('../../model/user/cart_model');

exports.addToCart = async (req,res) => {
    try {
        const { cartItem,quntity} = req.body;
        let isCart = await cartModel.findOne({cartItem: cartItem, user: req.user._id, isDelete: false});
        if(isCart){
            return res.json({message: "This product is already added in cart"});
        }
        let isProduct = await productModel.findOne({_id: cartItem, isDelete: false});
        if(!isProduct){
            return res.json({message: "This product is out of stock"});
        }

        isCart = await cartModel.create({
            user: req.user._id,
            cartItem,
            quntity,
            productPrice: isProduct.productPrice,
            productName: isProduct.productName,
            productImage: isProduct.productImage
        })
        isCart.save();
        res.json({isCart, message: "Product added in cart"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getAllCart = async (req,res) => {
    try {
        let allCart = await cartModel.find({user: req.user._id, isDelete: false});
        res.json(allCart);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.specificCart = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let cart = await cartModel.findOne({cartItem: cartItem, isDelete: false});
        if(!cart){
            return res.json({message:"No data found"})
        }
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateCart = async (req,res) => {
    try {
        let {cartItem, quntity} = req.body;
        let cart = await cartModel.findOne({user: req.user._id, isDelete: false});
        cart = await cartModel.findOne({cartItem: cartItem, isDelete: false});
        if(!cart){
            return res.json({message: "This product not found"});
        }
        cart = await cartModel.updateOne(
            {cartItem: cartItem},
            {
                $set: {quntity: quntity}
            },
            {new:true}
        )
        // cart.save();
        res.json({message: "cart updated"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.deleteCart = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let isCart = await cartModel.findOne({user: req.user._id, isDelete: false});
        isCart = await cartModel.findOne({cartItem: cartItem, isDelete: false});
        if(!isCart){
            return res.json({message: 'No data found!'})
        }
        isCart = await cartModel.updateOne(
            {cartItem: cartItem},
            {
                $set: {isDelete: true}
            },
            {new:true}
        )
        res.json({message: "Cart item deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}