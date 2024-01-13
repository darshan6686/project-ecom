const cartModel = require('../../model/user/cart_model');

exports.showAllCart = async (req,res) => {
    try {
        let allCart = await cartModel.find({isDelete: false}).populate('cartItem').populate('user');
        let cart = allCart.map((item) => ({
            user: item.user._id,
            name: item.user.name,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
            quantity : item.quntity
        }))
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.showCart = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let allCart = await cartModel.find({_id:cartItem, isDelete: false}).populate('cartItem').populate('user');
        let cart = allCart.map((item) => ({
            user: item.user._id,
            name: item.user.name,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
            quantity : item.quntity
        }))
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}