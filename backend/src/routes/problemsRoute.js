const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {createProblem, updateProblem, deleteProblem,getProblemById,getAllProblems,problemSolvedByUser} = require("../controllers/problemControllers")

const problemsRoute = express.Router();

//admin only accessible routes
problemsRoute.post("/admin",adminMiddleware, createProblem);
problemsRoute.put("/admin/:id",adminMiddleware, updateProblem);
problemsRoute.delete("/admin/:id",adminMiddleware, deleteProblem);

// //user accessible routes
problemsRoute.get("/solvedByUser",userMiddleware,problemSolvedByUser)
problemsRoute.get("/:id",userMiddleware,getProblemById);
problemsRoute.get("/",getAllProblems);

module.exports = problemsRoute;

