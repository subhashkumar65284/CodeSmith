const express = require("express");
const userMiddleware = require("../middlewares/userMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {createProblem, updateProblem, deleteProblem,getProblemById,getAllProblems,problemSolvedByUser, getAdminProblemById} = require("../controllers/problemControllers")

const problemsRoute = express.Router();

//admin only accessible routes
problemsRoute.post("/admin",adminMiddleware, createProblem);
problemsRoute.get("/admin/:id",adminMiddleware, getAdminProblemById);
problemsRoute.put("/admin/:id",adminMiddleware, updateProblem);
problemsRoute.delete("/admin/:id",adminMiddleware, deleteProblem);

// //user accessible routes
problemsRoute.get("/solvedByUser",userMiddleware,problemSolvedByUser)
problemsRoute.get("/",getAllProblems);
problemsRoute.get("/:id",userMiddleware,getProblemById);

module.exports = problemsRoute;

