const validator = require('validator');
const User = require("../models/userSchema");
const validateLogin = async (data) => {
    const mandatoryFields = ["email", "password"];

    const isAllowed = mandatoryFields.every(key =>
        Object.keys(data).includes(key)
    );

    if (!isAllowed) {
        throw new Error("One or more fields is/are missing!");
    }
    const {email,password} = data;
    if(!validator.isEmail(email))
            throw new Error("Enter a valid email!");
    
    if(!validator.isStrongPassword(password))
        throw new Error("Choose a Strong Password");
    
};

module.exports = validateLogin;