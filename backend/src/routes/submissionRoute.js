const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const submitProblem = require("../controllers/submissionController")

const submissionRoute = express.Router();

submissionRoute.post("/:id",userMiddleware,submitProblem);

module.exports = submissionRoute;