const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    username: {
        type: String
    },
    profileImage: {
        type: String
    },
    productImage: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('reviews', reviewSchema);