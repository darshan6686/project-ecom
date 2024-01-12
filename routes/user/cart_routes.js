const express = require('express');
const { verifyToken } = require('../../helpers/tokenVerify');
const { addToCart, deleteCart, getAllCart, specificCart, updateCart } = require('../../controller/user/cart_controller');
const { upload } = require('../../helpers/imageUploader');
const { tokenAdmin } = require('../../helpers/tokenAdmin');
const cartRoute = express.Router();

cartRoute.post('/add-cart', verifyToken,tokenAdmin , addToCart);
cartRoute.delete('/delete-cart', verifyToken, tokenAdmin, deleteCart);
cartRoute.get('/getall-cart', verifyToken, tokenAdmin, getAllCart);
cartRoute.get('/get-cart', verifyToken, tokenAdmin, specificCart);
cartRoute.put('/update-cart', verifyToken, tokenAdmin, updateCart);

module.exports = cartRoute