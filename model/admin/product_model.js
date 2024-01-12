const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    productImage: [{
        type: String,
        require: true
    }],
    productName: {
        type: String,
        unique: true
    },
    role: {
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

module.exports = mongoose.model('products', productSchema);