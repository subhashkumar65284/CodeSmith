const jwt = require('jsonwebtoken');
const redisClient = require("../config/redis");
const User = require("../models/userSchema");

const adminMiddleware = async (req,res,next) =>{
    const { token } = req.cookies;
  if (!token) throw new Error("Token not present!");

  const payload = jwt.verify(token, process.env.JWT_KEY);
  const { _id } = payload;
  if (!_id) throw new Error("Id is missing!");

  const user = await User.findById(_id);
  if (!user) throw new Error("User doesn't exist!");
  
  if(payload.role != "admin"){
    throw new Error("Error: For admin only access");
  }

  const isBlocked = await redisClient.exists(`token:${token}`);
  if (isBlocked) throw new Error("Invalid token");

  req.user = user;
  next();
}

module.exports = adminMiddleware;