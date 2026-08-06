const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const main = require("./config/db");
const redisClient = require("./config/redis");
const authRoute = require("./routes/userAuthRoute");
app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRoute);


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

