const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const {userProfile} = require("../controllers/userControllers");

const userRoute = express.Router();

userRoute.get("/profile",userMiddleware,userProfile);

module.exports = userRoute;