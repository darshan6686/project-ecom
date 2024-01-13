const express = require('express');
const { verifyToken } = require('../../helpers/tokenVerify');
const { addToCart, deleteCart, getAllCart, specificCart, updateCart } = require('../../controller/user/cart_controller');
const cartRoute = express.Router();

cartRoute.post('/add-cart', verifyToken , addToCart);
cartRoute.delete('/delete-cart', verifyToken, deleteCart);
cartRoute.get('/getall-cart', verifyToken, getAllCart);
cartRoute.get('/get-cart', verifyToken, specificCart);
cartRoute.put('/update-cart', verifyToken, updateCart);

module.exports = cartRoute