const express = require('express');
const { verifyToken } = require('../../helpers/tokenVerify');
const { addToFavourite, getAllFavourite, specificFavourite, deleteFavourite } = require('../../controller/user/favourite_controller');
const { tokenAdmin } = require('../../helpers/tokenAdmin');
const favouriteRoute = express.Router();

favouriteRoute.post('/add-fav', verifyToken, tokenAdmin, addToFavourite);
favouriteRoute.get('/getall-fav', verifyToken, tokenAdmin, getAllFavourite);
favouriteRoute.get('/get-fav', verifyToken, tokenAdmin, specificFavourite);
favouriteRoute.delete('/delete-fav', verifyToken, tokenAdmin, deleteFavourite);

module.exports = favouriteRoute