const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:3,
        trim:true,
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
        type:[String]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    password:{
        type:String,
        trim:true,
        required:true
    }

},{timestamps:true})

const User = mongoose.model("users",userSchema);
module.exports = User;