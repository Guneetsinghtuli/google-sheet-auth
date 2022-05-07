const express = require("express");
const { fetchDataFromSheet } = require("../Controller/fetchDataFromSheet");
const userAuth = require("../Middleware/userAuth");

const fetchDataRouter = express.Router()

fetchDataRouter.get("/spreadsheet/:id",userAuth,fetchDataFromSheet)


module.exports = fetchDataRouter