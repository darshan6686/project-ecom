const productModel = require('../../model/admin/product_model');
const cartModel = require('../../model/user/cart_model');

exports.addToCart = async (req,res) => {
    try {
        const { cartItem,quntity} = req.body;
        let isCart = await cartModel.findOne({cartItem: cartItem, user: req.user._id, isDelete: false});
        if(isCart){
            return res.json({message: "This product is already added in cart"});
        }

        isCart = await cartModel.create({
            user: req.user._id,
            cartItem,
            quntity
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
        let allCart = await cartModel.find({user: req.user._id, isDelete: false}).populate('cartItem');
        let cart = allCart.map((item) => ({
            _id : item._id ,
            user: req.user._id,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
            quantity : item.quntity,
            isDelete: item.isDelete
        }))
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.specificCart = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let cart = await cartModel.find({cartItem: cartItem, isDelete: false}).populate('cartItem');
        if(!cart){
            return res.json({message:"No data found"})
        }
        let allcart = cart.map((item) => ({
            _id : item._id ,
            user: req.user._id,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
            quantity : item.quntity,
            isDelete: item.isDelete
        }))
        res.json(allcart);
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