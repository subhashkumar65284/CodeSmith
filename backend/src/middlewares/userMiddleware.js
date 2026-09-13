const jwt = require('jsonwebtoken');
const redisClient = require("../config/redis");
const User = require("../models/userSchema");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Token not present!"
      });
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);
    const { _id } = payload;

    if (!_id) {
      return res.status(401).json({
        message: "Id is missing!"
      });
    }

    const user = await User.findById(_id); 
    if (!user) {
      return res.status(401).json({
        message: "User doesn't exist!"
      });
    }

    const isBlocked = await redisClient.exists(`token:${token}`);
    if (isBlocked) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = userMiddleware;