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
//check Auth
authRoute.get("/check",userMiddleware,(req,res)=>{
    try{
        const response = {
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        email:req.user.email,
        id:req.user._id
    }
    res.status(200).json({
        user:response,
        message:"User Authentication Successfull"
    })
    }catch(err){
        res.status(500).send("Error : " + err);
    }
    
})


module.exports = authRoute