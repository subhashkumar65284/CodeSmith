const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const {submitProblem,runProblem} = require("../controllers/submissionController")

const submissionRoute = express.Router();

submissionRoute.post("/submit/:id",userMiddleware,submitProblem);
submissionRoute.post("/run/:id",userMiddleware,runProblem);

module.exports = submissionRoute;