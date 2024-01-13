const express = require('express');
const { verifyToken } = require('../../helpers/tokenVerify');
const { addToFavourite, getAllFavourite, specificFavourite, deleteFavourite } = require('../../controller/user/favourite_controller');
const favouriteRoute = express.Router();

favouriteRoute.post('/add-fav', verifyToken, addToFavourite);
favouriteRoute.get('/getall-fav', verifyToken, getAllFavourite);
favouriteRoute.get('/get-fav', verifyToken, specificFavourite);
favouriteRoute.delete('/delete-fav', verifyToken, deleteFavourite);

module.exports = favouriteRoute