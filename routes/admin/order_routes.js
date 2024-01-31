const express = require('express');
const { showAllOrder, specificOrder } = require('../../controller/admin/order_controller');
const { tokenAdmin } = require('../../helpers/tokenAdmin');
const orderRoute = express.Router();

orderRoute.get('/showall-order', tokenAdmin, showAllOrder);
orderRoute.get('/show-order', tokenAdmin, specificOrder);

module.exports = orderRoute