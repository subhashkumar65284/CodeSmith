const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");
require("dotenv").config();
const validateReg = require("../utils/validateReg");
const validateLogin = require("../utils/validateLogin");
const Submission = require("../models/submissionSchema");

const register = async (req, res) => {
  try {
    validateReg(req.body);
    const { firstName, lastName, email, password } = req.body;
    //password hashing (can salt for even more security);
    req.body.password = await bcrypt.hash(password, 10);

    //Very Important to prevent user register themselves as admin
    req.body.role = "user";

    const user = await User.create(req.body);
    const token = jwt.sign(
      { _id: user._id, email: email, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 3600 },
    );
    const response = {
      firstName: user.firstName,
      lastName : user.lastName,
      id:user._id,
      email:user.email
    }
    res.cookie("token", token, { maxAge: 3600 * 1000 });
    res.status(201).json({
      user:response,
      message:"User registered Successfully"
    })
  } catch (err) {
    res.send("Error : " + err);
  }
};

const login = async (req, res) => {
  try {
    validateLogin(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    const token = jwt.sign(
      { _id: user._id, email: email, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 3600 },
    );
    const response = {
      firstName: user.firstName,
      lastName : user.lastName,
      email:user.email,
      id:user._id
    }
    res.cookie("token", token, { maxAge: 3600 * 1000 });
    res.status(201).json({
      user:response,
      message:"Login Successfull"
    })
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
const adminRegister = async (req, res) => {
  try {
    validateReg(req.body);
    const { email, password } = req.body;
    //password hashing (can salt for even more security);
    req.body.password = await bcrypt.hash(password, 10);

    const user = await User.create(req.body);
    const token = jwt.sign(
      { _id: user._id, email: email, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 3600 },
    );
    res.cookie("token", token, { maxAge: 3600 * 1000 });
    res.status(201).send("User Registered Successfully!");
  } catch (err) {
    res.send("Error : " + err);
  }
};
const userProfile = async (req, res) => {
  try {
    const user = await req.user.populate({
      path: "problemSolved",
      select: "-_id title difficulty topics",
    });

    res.status(200).json({
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: user.email,
      problemsSolved: user.problemSolved,
      role: user.role,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error : " + err);
  }
};
const problemSubmissions = async (req, res) => {
  try {
    const userId = req.user._id;
    const problemId = req.params.pid;

    const submissions = await Submission.find({ userId, problemId });

    if (submissions.length == 0) {
      return res.status(404).json({
        message: "No submissions for this problem",
      });
    }

    res.status(200).send(submissions);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  register,
  login,
  logout,
  adminRegister,
  userProfile,
  problemSubmissions,
};
