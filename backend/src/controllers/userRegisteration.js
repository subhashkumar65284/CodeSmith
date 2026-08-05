const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const validateReg = require('../utils/validateReg');
const register = async (req,res)=>{
    try{
        validateReg(req.body);
        const {firstName,email,password} = req.body;
        //password hashing (can salt for even more security);
        req.body.password = await bcrypt.hash(password,10);

        const user = await User.create(req.body);
        const token = jwt.sign({_id:user._id,email:email},process.env.JWT_KEY,{expiresIn:3600});
        res.cookie("token",token,{maxAge:3600*1000});
        res.status(201).send("User Registered Successfully!");
    }catch(err){
        res.send("Error : " + err);
    }
}

module.exports = register