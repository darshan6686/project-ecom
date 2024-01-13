const express = require('express');
const { showAllProduct, specificProduct } = require('../../controller/user/product_controller');
const { verifyToken } = require('../../helpers/tokenVerify');
const { tokenAdmin } = require('../../helpers/tokenAdmin');
const productRoute = express.Router();

productRoute.get('/showall-product', verifyToken, showAllProduct);
productRoute.get('/show-product', verifyToken, specificProduct);

module.exports = productRoute