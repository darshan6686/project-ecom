const express = require('express');
const { showAllCart, showCart } = require('../../controller/admin/cart_controller');
const { tokenAdmin } = require('../../helpers/tokenAdmin');
const cartRoute = express.Router();

cartRoute.get('/showall-cart', tokenAdmin ,showAllCart);
cartRoute.get('show-cart', tokenAdmin, showCart);

module.exports = cartRoute