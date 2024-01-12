const express = require('express');
const productRoute = require('./product_routes');
const adminRoute = require('./admin_routes');
const orderRoute = require('./order_routes');
const indexRoute = express.Router();

indexRoute.use('/product', productRoute);
indexRoute.use('/adminuser', adminRoute);
indexRoute.use('/order', orderRoute);

module.exports = indexRoute