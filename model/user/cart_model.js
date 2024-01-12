const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
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
    quntity: {
        type: Number,
        default: 1
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('carts', cartSchema);