const reviewModel = require('../../model/user/review_model');
const userModel = require('../../model/user_model');
const productModel = require('../../model/admin/product_model');

exports.addReivew = async (req,res) => {
    try {
        const {cartItem, title, rating, productImage} = req.body;

        let isUser = await userModel.findOne({_id: req.user._id, isDelete: false});
        if(!isUser){
            return res.json({message: "You are not login"});
        }

        let isProduct = await productModel.findOne({_id: cartItem, isDelete: false});
        if(!isProduct){
            return res.json({message: "This product is not found"});
        }

        let productpath;
        if(req.file){
            productpath = `${req.file.path}`;
        }
        let review = await reviewModel.create({
            user: req.user._id,
            cartItem,
            title,
            productImage: productpath,
            rating
        })

        let totalScore = await reviewModel.find();
        let reviewLength = totalScore.length;
        let rat = totalScore.map((item) => ({avgrating: item.rating}))
        let total = rat.reduce((total,val)=>total += (val.avgrating),0);
        let avg = total/reviewLength;
        console.log(avg);
        review.save();
        res.json({review, message: "Your review was added"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getAllReview = async (req,res) => {
    try {
        let allReview = await reviewModel.find({user: req.user._id, isDelete: false}).populate('cartItem').populate('user');
        let review = allReview.map((item) => ({
            _id : item._id ,
            user: req.user._id,
            name: item.user.name,
            cartItem: item.cartItem._id,
            title: item.title,
            productImage : item.cartItem.productImage
        }))
        res.json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.specificReivew = async (req,res) => {
    try {
        const {cartItem} = req.body;
        let allReview = await reviewModel.find({_id: cartItem, isDelete: false}).populate('cartItem').populate('user');
        if(!allReview){
            return res.json('review not found')
        }
        let review = allReview.map((item) => ({
            _id : item._id ,
            user: req.user._id,
            name: item.user.name,
            cartItem: item.cartItem._id,
            title: item.title,
            productImage : item.cartItem.productImage
        }))
        res.json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateReview = async (req,res) => {
    try {
        const {cartItem, title, reviewId} = req.body;
        let isReview = await reviewModel.findOne({_id: reviewId, cartItem: cartItem, isDelete: false});
        if (!isReview) {
            return res.status(401).json({ message : "You can not update this review!" });
        }
        isReview = await reviewModel.findByIdAndUpdate(
            reviewId,
            {
                $set: {title: title}
            },
            {new: true}
        )
        res.json({isReview, message: "review updated"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.deleteReview = async (req,res) => {
    try {
        const {reviewId} = req.body;
        let isUser = await reviewModel.findOne({ _id: reviewId, user: req.user._id, isDelete: false });
        if (!isUser) {
            return res.json({ message: 'You can not delete this review'});
        }
        let review = await reviewModel.findByIdAndUpdate(
            reviewId,
            {
                $set: {isDelete: true}
            },
            { new: true }
        )
        res.json({review, message: "review is deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}