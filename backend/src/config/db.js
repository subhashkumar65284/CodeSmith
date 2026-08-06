const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_CONNECT_STRING;
const main = async () => {
    await mongoose.connect(uri);
}
module.exports = main;