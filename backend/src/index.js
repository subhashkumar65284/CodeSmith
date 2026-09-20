const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const main = require("./config/db");
const redisClient = require("./config/redis");
const authRoute = require("./routes/userAuthRoute");
const problemsRoute = require("./routes/problemsRoute");
const submissionRoute = require("./routes/submissionRoute");
const userRoute = require("./routes/userRoute");
const cors = require('cors')

app.use(cors({
  origin:'http://localhost:5173', 
  credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRoute);
app.use("/problem",problemsRoute);
app.use("/submission",submissionRoute);
app.use("/user",userRoute);


const initializeConnection = async () => {
  try {
    await Promise.all([redisClient.connect(), main()]);

    console.log("Connected to Redis and database");

    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error initializing connections:", err);
  }
};

initializeConnection();

