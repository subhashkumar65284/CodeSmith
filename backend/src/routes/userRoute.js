const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const {problemSolvedByUser,problemSubmissions} = require("../controllers/userControllers");

const userRoute = express.Router();

userRoute.get("/profile",userMiddleware,problemSolvedByUser);
userRoute.get("/problem/submissions/:pid",userMiddleware,problemSubmissions);

module.exports = userRoute;