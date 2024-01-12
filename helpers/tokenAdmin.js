const userModel = require('../model/user_model');
const jwt = require('jsonwebtoken');

exports.tokenAdmin = async (req,res,next) => {
    let token = req.headers["authorization"].split(' ')[1];
    let {userId} = jwt.verify(token, process.env.SECRETE_KEY);
    req.admin = await userModel.findOne({_id: userId, isAdmin: true});
    if(req.admin){
        next();
    }
    else{
        res.json({message: "Invalide admin"})
    }
}