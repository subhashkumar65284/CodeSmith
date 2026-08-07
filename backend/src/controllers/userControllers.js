const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");
require("dotenv").config();
const validateReg = require("../utils/validateReg");
const validateLogin = require("../utils/validateLogin");

const register = async (req, res) => {
  try {
    validateReg(req.body);
    const { firstName, email, password } = req.body;
    //password hashing (can salt for even more security);
    req.body.password = await bcrypt.hash(password, 10);

    //Very Important to prevent user register themselves as admin
    req.body.role = "user";

    const user = await User.create(req.body);
    const token = jwt.sign(
      { _id: user._id, email: email , role:user.role},
      process.env.JWT_KEY,
      { expiresIn: 3600 },
    );
    res.cookie("token", token, { maxAge: 3600 * 1000 });
    res.status(201).send("User Registered Successfully!");
  } catch (err) {
    res.send("Error : " + err);
  }
};
const login = async (req, res) => {
  try {
    validateLogin(req.body);
    const { firstName, email, password } = req.body;
    //password hashing (can salt for even more security);
    req.body.password = await bcrypt.hash(password, 10);

    const user = await User.findOne({ email: email });
    const token = jwt.sign(
      { _id: user._id, email: email ,role:user.role},
      process.env.JWT_KEY,
      { expiresIn: 3600 },
    );
    res.cookie("token", token, { maxAge: 3600 * 1000 });
    res.status(201).send("Logged in Successfully!");
  } catch (err) {
    res.send("Error : " + err);
  }
};
const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.verify(token, process.env.JWT_KEY);

    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);

    res.clearCookie("token");
    res.status(200).send("Logout successful!");
  } catch (err) {
    res.send("Error : " + err);
  }
};
const adminRegister = async(req,res) =>{
    try {
    validateReg(req.body);
    const { firstName, email, password } = req.body;
    //password hashing (can salt for even more security);
    req.body.password = await bcrypt.hash(password, 10);

    const user = await User.create(req.body);
    const token = jwt.sign(
      { _id: user._id, email: email, role:user.role },
      process.env.JWT_KEY,
      { expiresIn: 3600 },
    );
    res.cookie("token", token, { maxAge: 3600 * 1000 });
    res.status(201).send("User Registered Successfully!"); 
  } catch (err) {
    res.send("Error : " + err);
  }
}

module.exports = { register, login, logout, adminRegister }; 
