const express = require("express");
const register = require("../controllers/userRegisteration");

const authRoute = express.Router();

//Register
authRoute.post("/register",register);
// //Login
// authRoute.post("/login",login);
// //Logout
// authRoute.post("/logout",logout);
// //My Profile
// authRoute.get("/myProfile",myProfile);

module.exports = authRoute