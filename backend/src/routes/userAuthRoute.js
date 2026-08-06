const express = require("express");
const {register,login,logout} = require("../controllers/userControllers");
const userMiddleware = require("../middlewares/userMiddleware");

const authRoute = express.Router();

//Register
authRoute.post("/register",register);
// //Login
authRoute.post("/login",login);
// //Logout
authRoute.post("/logout",userMiddleware,logout);
// //My Profile
// authRoute.get("/myProfile",myProfile);

module.exports = authRoute