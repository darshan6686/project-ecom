const favouriteModel = require('../../model/user/favourite_model');

exports.addToFavourite = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let isFavourite = await favouriteModel.findOne({cartItem: cartItem, isDelete: false});
        if(isFavourite){
            return res.json({message: "This product is already added in favourite list"});
        }

        let favourite = await favouriteModel.create({
            user: req.user._id,
            cartItem
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
        let allFavourite = await favouriteModel.find({user: req.user._id, isDelete: false}).populate('cartItem');
        let favourite = allFavourite.map((item) => ({
            _id : item._id ,
            user: req.user._id,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
        }))
        res.json(favourite);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.specificFavourite = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let allFavourite = await favouriteModel.find({cartItem: cartItem, isDelete: false}).populate('cartItem');
        if(!allFavourite){
            return res.json({message:"No data found"})
        }
        let favourite = allFavourite.map((item) => ({
            _id : item._id ,
            user: req.user._id,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
        }))
        res.json(favourite);
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