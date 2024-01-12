const express = require('express');
const cartRoute = require('./cart_routes');
const orderRoute = require('./order_routes');
const favouriteRoute = require('./favourite_routes');
const reviewRoute = require('./review_routes');
const productRoute = require('./product_routes');
const router = express.Router();

router.use('/cart', cartRoute);
router.use('/order', orderRoute);
router.use('/fav', favouriteRoute);
router.use('/review', reviewRoute);
router.use('/product', productRoute)

module.exports = router;