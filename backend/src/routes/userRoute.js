const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const {userProfile,problemSubmissions} = require("../controllers/userControllers");

const userRoute = express.Router();

userRoute.get("/profile",userMiddleware,userProfile);
userRoute.get("/problem/submissions/:pid",userMiddleware,problemSubmissions);

module.exports = userRoute;