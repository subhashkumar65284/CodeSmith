const express = require("express");
const {register,login,logout, adminRegister} = require("../controllers/userControllers");
const userMiddleware = require("../middlewares/userMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const createProblem = require("../controllers/problemControllers")

const problemsRoute = express.Router();

//admin only accessible routes
problemsRoute.post("/admin",adminMiddleware, createProblem);
// problemsRoute.put("/update",adminMiddleware, updateProblem);
// problemsRoute.post("/delete",adminMiddleware, deleteProblem);

// //user accessible routes
// problemsRoute.get("/:id",getProblem);
// problemsRoute.get("/",getAllProblem);

module.exports = problemsRoute;

