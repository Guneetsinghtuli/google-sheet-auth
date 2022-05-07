var jwt = require("jsonwebtoken");
const JSON_TOKEN = process.env.JSON_TOKEN


const userAuth = async (req, res, next) => {
  try {
    const token = req.body.authToken
    // Check for token in request
    if (!token) {
      return res.status(401).json({
        message: "Auth Token is missing",
        success: false,
      });
    }

    const decoded_token = await jwt.verify(token, JSON_TOKEN)
    // Check if token is valid
    if(!decoded_token){
        return res.status(401).json({
            success:false,
            message:"Auth Token is not valid."
        })
    }

    req.user = decoded_token.email
    next()

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Auth Token is not valid",
    });
  }
};

module.exports = userAuth