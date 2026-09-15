const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const rateLimiter = require("../middlewares/rateLimiter");
const {submitProblem,runProblem} = require("../controllers/submissionController")

const submissionRoute = express.Router();

submissionRoute.post("/submit/:id",userMiddleware,rateLimiter,submitProblem);
submissionRoute.post("/run/:id",userMiddleware,rateLimiter,runProblem);

module.exports = submissionRoute;