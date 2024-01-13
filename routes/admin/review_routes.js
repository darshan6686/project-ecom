const express = require('express');
const { tokenAdmin } = require('../../helpers/tokenAdmin');
const { showAllReview, showReview } = require('../../controller/admin/review_controller');
const reviewRoute = express.Router();

reviewRoute.get('/showall-review', tokenAdmin, showAllReview);
reviewRoute.get('/show-review', tokenAdmin, showReview);

module.exports = reviewRoute