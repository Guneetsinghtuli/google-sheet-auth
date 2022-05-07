const express = require("express");
const { userSignup, userLogin } = require("../Controller/userController");

const userRouter = express.Router()

userRouter.get("/login",userLogin)

userRouter.post("/signup",userSignup)


module.exports = userRouter