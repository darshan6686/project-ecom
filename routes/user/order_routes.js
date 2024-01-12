const express = require('express');
const { verifyToken } = require('../../helpers/tokenVerify');
const { addOrder, getOrder, deleteOrder } = require('../../controller/user/order_controller');
const { tokenAdmin } = require('../../helpers/tokenAdmin');
const orderRoute = express.Router();

orderRoute.post('/add-order', verifyToken, tokenAdmin, addOrder);
orderRoute.get('/get-order', verifyToken, tokenAdmin, getOrder);
orderRoute.delete('/delete-order', verifyToken, tokenAdmin, deleteOrder);

module.exports = orderRoute