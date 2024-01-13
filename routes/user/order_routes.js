const express = require('express');
const { verifyToken } = require('../../helpers/tokenVerify');
const { addOrder, getOrder, deleteOrder } = require('../../controller/user/order_controller');
const orderRoute = express.Router();

orderRoute.post('/add-order', verifyToken, addOrder);
orderRoute.get('/get-order', verifyToken, getOrder);
orderRoute.delete('/delete-order', verifyToken, deleteOrder);

module.exports = orderRoute