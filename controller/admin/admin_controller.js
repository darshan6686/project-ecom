const userModel = require('../../model/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getProfile = async (req,res) => {
    try {
        res.json(req.admin);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.changePassword = async (req,res) => {
    try {
        let {password, newPassword, confirmPassword} = req.body;
        let checkPassword = await bcrypt.compare(password, req.admin.password);
        if (!checkPassword) {
            return res.json({message: 'Incorrect current password'})
        }
        if (newPassword !== confirmPassword) {
            return res.json({message:'New password and Confirm password do not match.'})
        }
        let hashedPassword = await bcrypt.hash(confirmPassword, 10);
        let user = await userModel.updateOne(
            { _id : req.admin._id},
            {$set:
                {
                    password: hashedPassword,
                    confirmPassword: hashedPassword
                }
            },
            {new: true}
        )
        // user.save();
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
            req.admin._id,
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
            req.admin._id,
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