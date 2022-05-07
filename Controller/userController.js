const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const getDataFromSheet = require("../Functions/getData");
const saveLoginCred = require("../Functions/SaveUserDetails");
const sheets = require("../sheets");
require("dotenv").config();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_SEC = process.env.JWT_SEC;

const userLogin = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      success: false,
      message: "Must provide Email and Password",
    });
  }

  let emailList = await getDataFromSheet(SPREADSHEET_ID, "Sheet2!A2:A");
  let mergedEmail = [].concat.apply([], emailList);
  let flag = 0;
  let row = 1;
  for (let index = 0; index < mergedEmail.length; index++) {
    const element = mergedEmail[index];
    row++;
    if (element == req.body.email) {
      flag = 1;
      break;
    }
  }
  if (!flag) {
    return res.status(422).json({
      success: false,
      message: "Please check your credentials",
    });
  }

  let user = await getDataFromSheet(SPREADSHEET_ID, `Sheet2!B${row}`);
  let hashedPass = user[0][0];

  let check = await bcrypt.compare(req.body.password, hashedPass);
  if (!check) {
    return res.status(422).json({
      success: false,
      message: "Please check your credentials",
    });
  }

  let payload ={
    email: req.body.email
  }
  
  let sign = await jwt.sign(payload,JWT_SEC)

  return res.status(200).json({
    success:true,
    message:"Successfully logged in",
    authToken: sign
  })
};

const userSignup = async (req, res, next) => {
  // If email and passwords are provided
  if (!req.body.email) {
    return res.status(422).json({
      success: false,
      message: "Must provide Email and Password",
    });
  }
  if (!req.body.password) {
    return res.status(422).json({
      success: false,
      message: "Must provide Email and Password",
    });
  }

  // check if email already exists
  let emailList = await getDataFromSheet(SPREADSHEET_ID, "Sheet2!A2:A");

  let mergedEmail = [].concat.apply([], emailList);
  let flag = 0;
  for (let index = 0; index < mergedEmail.length; index++) {
    const element = mergedEmail[index];

    if (element == req.body.email) {
      flag = 1;
      break;
    }
  }
  if (flag) {
    return res.status(422).json({
      success: false,
      message: "Email already exists",
    });
  }

  const hashedPass = await bcrypt.hash(
    req.body.password,
    parseInt(SALT_ROUNDS, 10)
  );
  let values = [[req.body.email, hashedPass]];
  await saveLoginCred(SPREADSHEET_ID, values);
  return res.status(200).json({
    success: true,
    message: "Account created successfully",
  });
};

module.exports = {
  userLogin,
  userSignup,
};
