const express = require('express');
const { verifyToken } = require('../../helpers/tokenVerify');
const { upload } = require('../../helpers/imageUploader');
const { addReivew, getAllReview, specificReivew, updateReview, deleteReview } = require('../../controller/user/review_controller');
const { tokenAdmin } = require('../../helpers/tokenAdmin');
const reviewRoute = express.Router();

reviewRoute.post('/add-review', verifyToken, tokenAdmin, upload.single('productImage') ,addReivew);
reviewRoute.get('/getall-review', verifyToken, tokenAdmin, getAllReview);
reviewRoute.get('/get-review', verifyToken, tokenAdmin, specificReivew);
reviewRoute.put('/update-review', verifyToken, tokenAdmin, updateReview);
reviewRoute.delete('/delete-review', verifyToken, tokenAdmin, deleteReview);

module.exports = reviewRoute