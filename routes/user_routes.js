const express = require('express');
const userRoute = express.Router();
const{
    signUp,
    login,
    getProfile,
    changePassword,
    updateProfile,
    deleteProfile
} = require('../controller/user_controller');
const { verifyToken } = require('../helpers/tokenVerify');
const { upload } = require('../helpers/imageUploader');

userRoute.post('/signUp', upload.single('profileImage'), signUp);
userRoute.post('/login', login);
userRoute.get('/profile', verifyToken, getProfile);
userRoute.put('/changePassword', verifyToken, changePassword);
userRoute.put('/updateProfile', verifyToken,upload.single('profileImage'), updateProfile);
userRoute.delete('/deleteProfile', verifyToken, deleteProfile);

module.exports = userRoute