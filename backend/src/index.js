const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const main = require("./config/db");
app.use(express.json());
app.use(cookieParser());

main()
.then(async ()=>{
    app.listen(process.env.PORT, () => {
  console.log(`CodeSmith listening on PORT : ${process.env.PORT}`); 
});
})
.catch((err)=>{
    console.log("Error occured : " + err);
})

