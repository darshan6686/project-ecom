const favouriteModel = require('../../model/user/favourite_model');
const productModel = require('../../model/admin/product_model');

exports.addToFavourite = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let isFavourite = await favouriteModel.findOne({cartItem: cartItem, isDelete: false});
        if(isFavourite){
            return res.json({message: "This product is already added in favourite list"});
        }

        let isProduct = await productModel.findOne({_id: cartItem, isDelete: false});

        let favourite = await favouriteModel.create({
            user: req.user._id,
            cartItem,
            productImage: isProduct.productImage,
            productName: isProduct.productName,
            productPrice: isProduct.productPrice
        })
        favourite.save();
        res.json({favourite, message: "product is added in your faourite list"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getAllFavourite = async (req,res) => {
    try {
        let isFavourite = await favouriteModel.find({user: req.user._id, isDelete: false});
        res.json(isFavourite);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.specificFavourite = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let isFavourite = await favouriteModel.find({user: req.user._id, isDelete: false});
        isFavourite = await favouriteModel.findOne({cartItem: cartItem, isDelete: false});
        if(!isFavourite){
            return res.json({message: "This product does not found in your favourite list"});
        }
        res.json(isFavourite);
    } catch (err) {
        console.log(err);
    }
}

exports.deleteFavourite = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let isFavourite = await favouriteModel.findOne({user: req.user._id, isDelete: false});
        isFavourite = await favouriteModel.findOne({cartItem: cartItem, isDelete: false});
        if(!isFavourite){
            return res.json({message: "This product does not found in your favourite list"});
        }
        isFavourite = await favouriteModel.updateOne(
            {cartItem: cartItem},
            {
                $set: {isDelete: true}
            },
            {new: true}
        )
        res.json({message: "This product removed in your favourite list"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}