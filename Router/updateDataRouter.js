const express = require("express");
const { changeDataFromSheet } = require("../Controller/changeDataFromSheet");
const userAuth = require("../Middleware/userAuth");

const updateDataRouter = express.Router()

updateDataRouter.put("/update",userAuth,changeDataFromSheet)

module.exports = updateDataRouter