const express = require('express');
const { showAllOrder, specificOrder } = require('../../controller/admin/order_controller');
const orderRoute = express.Router();

orderRoute.get('/showall-order', showAllOrder);
orderRoute.get('/show-order', specificOrder);

module.exports = orderRoute