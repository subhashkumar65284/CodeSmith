const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const main = require("./config/db");
const authRoute = require("./routes/userAuthRoute");
app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRoute);

main()
.then(async ()=>{
    app.listen(process.env.PORT, () => {
  console.log(`CodeSmith listening on PORT : ${process.env.PORT}`);  
});
})
.catch((err)=>{
    console.log("Error occured : " + err);
})

