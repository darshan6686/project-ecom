const userModel = require('../model/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req,res) => {
    try{
        let {name, email, password, confirmPassword, profileImage, isAdmin} = req.body;
        let user = await userModel.findOne({email: email, isDelete: false});
        if(user){
            return res.json({messge: "Email already exists."})
        }

        if(password !== confirmPassword){
            return res.json({messge: "Passwords do not match."});
        }
        const hashedPassword = await bcrypt.hash(confirmPassword, 8);

        let filepath;
        if(req.file){
            filepath = `${req.file.path}`;
        }
        user = await userModel.create({
            name, email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            profileImage: filepath,
            isAdmin
        })
        user.save();
        res.json({user, messge: "user added..."});
    }
    catch(err){
        console.log(err);
        res.status(500).json({messge: "Internal server error"});
    }
}

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;
        let user = await userModel.findOne({email: email, isDelete: false});
        if(!user){
            return res.json({message:"User does not exist."});
        }
        let checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.json({message:"Invalid Password."});
        }
        let playload = {
            userId: user._id
        }
        let token = jwt.sign(playload, process.env.SECRETE_KEY);
        res.json({token, message: "login successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({messge: "Internal server error"});
    }
}

exports.getProfile = async (req,res) => {
    try {
        res.json(req.user);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.changePassword = async (req,res) => {
    try {
        let {password, newPassword, confirmPassword} = req.body;
        let checkPassword = await bcrypt.compare(password, req.user.password);
        if (!checkPassword) {
            return res.json({message: 'Incorrect current password'})
        }
        if (newPassword !== confirmPassword) {
            return res.json({message:'New password and Confirm password do not match.'})
        }
        let hashedPassword = await bcrypt.hash(confirmPassword, 10);
        let user = await userModel.updateOne(
            { _id : req.user._id},
            {$set:
                {
                    password: hashedPassword,
                    confirmPassword: hashedPassword
                }
            },
            {new: true}
        )
        user.save();
        res.json({message: "password update successfullt"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.updateProfile = async (req,res) => {
    try {
        let {name, email, profileImage} = req.body;
        let filepath;
        if(req.file){
            filepath = `${req.file.path}`
        }
        let user = await userModel.findByIdAndUpdate(
            req.user._id,
            { $set:
                {
                    name: name,
                    email: email,
                    profileImage: filepath,
                },
            },
            {new:true}
        )
        res.json({user, message: "profile changed successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

exports.deleteProfile = async (req,res) => {
    try {
        let user = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                $set: {isDelete: true}
            }
        )
        res.json({user, message: "profile deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}