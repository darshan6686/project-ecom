const reviewModel = require('../../model/user/review_model');

exports.showAllReview = async (req,res) => {
    try {
        let isUser = await reviewModel.find({ isDelete: false});
        res.json(isUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.showReview = async (req,res) => {
    try {
        const {reviewId} = req.body;
        let isReview = await reviewModel.find({_id: reviewId, isDelete: false});
        if(!isReview){
            return res.status(404).json({message:"This item does not have a review."});
        }
        res.json(isReview);  
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}