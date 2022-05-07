const {google} = require('googleapis')
require('dotenv').config()

const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL,
  );
  
  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
  });


const sheets = google.sheets({
    version:'v4',
    auth: oauth2Client
})

module.exports = sheets