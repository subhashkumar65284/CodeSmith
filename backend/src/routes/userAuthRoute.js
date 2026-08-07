const express = require("express");
const {register,login,logout, adminRegister} = require("../controllers/userControllers");
const userMiddleware = require("../middlewares/userMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const authRoute = express.Router();

//Register
authRoute.post("/register",register);
// //Login
authRoute.post("/login",login);
// //Logout
authRoute.post("/logout",userMiddleware,logout);
//admin Register
authRoute.post("/admin/register",adminMiddleware,adminRegister);
// //My Profile
// authRoute.get("/myProfile",myProfile);

module.exports = authRoute