const orderModel = require('../../model/user/order_model');

exports.showAllOrder = async (req,res) => {
    try {
        let order = await orderModel.find({isDelete: false});
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.specificOrder = async (req,res) => {
    try {
        const {orderId} = req.body;
        let order = await orderModel.findOne({_id: orderId , isDelete: false});
        if(!order){
            return res.json({message:"your order not found"});
        }
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Inrernal Server Error"});
    }
}