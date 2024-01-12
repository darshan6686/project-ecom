const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    productImage: [{
        type: String
    }],
    productName: {
        type: String,
        require: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('favourites', favouriteSchema);