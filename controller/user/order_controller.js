const orderModel = require('../../model/user/order_model');
const cartModel = require('../../model/user/cart_model');

exports.addOrder = async (req,res) => {
    try {
        let cartItem = await cartModel.find({user: req.user._id, isDelete: false}).populate('cartItem');

        let orderItem = cartItem.map((item) => ({
            cartItem: item.cartItem._id,
            quntity: item.quntity,
            productPrice: item.cartItem.productPrice,
            productName: item.cartItem.productName,
            productImage: item.cartItem.productImage
        }));

        let totalPrice = orderItem.reduce(((total, item) => total += (item.quntity * item.productPrice)),0);

        let newOrder = await orderModel.create({
            user: req.user._id,
            items: orderItem,
            totalPrice: totalPrice
        });

        newOrder.save();
        await cartModel.updateMany({user: req.user._id}, {isDelete: true});
        res.json({newOrder, message: "order added successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getOrder = async (req,res) => {
    try {
        let getorder = await orderModel.find({user: req.user._id, isDelete: false});
        if(!getorder){
            return res.status(401).json({message:"No Order Found!"})
        }
        res.json(getorder);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.deleteOrder = async (req,res) => {
    try {
        let order = await orderModel.updateOne(
            {user: req.user._id},
            {
                $set: {isDelete: true}
            },
        )
        res.json({message: "order deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}