const mongoose = require("mongoose");
require("dotenv").config();

const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20
    }, 
    email:{
        type:String,
        trim:true,
        immutable:true,
        required:true,
        unique:true
    },
    problemSolved:{
        type:[string]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }

},{timestamps:true})

const User = mongoose.connect("users",userSchema);