const express = require('express');
const productRoute = require('./product_routes');
const adminRoute = require('./admin_routes');
const orderRoute = require('./order_routes');
const cartRoute = require('./cart_routes');
const reviewRoute = require('./review_routes');
const indexRoute = express.Router();

indexRoute.use('/product', productRoute);
indexRoute.use('/adminuser', adminRoute);
indexRoute.use('/order', orderRoute);
indexRoute.use('/cart', cartRoute);
indexRoute.use('/review', reviewRoute);

module.exports = indexRoute