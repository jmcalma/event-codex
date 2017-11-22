var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

let credentials = {
  "web": {
    "client_id": "227942813018-jkuaii0nnnp2nr0v232ot3403kdh1c6d.apps.googleusercontent.com",
    "project_id": "abiding-ion-186002",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "NsS6KMkzLj4FJqpRGYuu2Rd9",
    "redirect_uris": [
      "http://localhost:5000/auth/google",
      "http://ec2-54-215-238-243.us-west-1.compute.amazonaws.com/"
    ],
    "javascript_origins": [
      "http://localhost:5000",
      "http://ec2-54-215-238-243.us-west-1.compute.amazonaws.com"
    ]
  }
}

module.exports = app => {
  app.get("/auth/google", (req, res) => {
    // SHARED
    var clientSecret = credentials.web.client_secret;
    var clientId = credentials.web.client_id;
    var redirectUrl = credentials.web.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret,
      redirectUrl);
    // When there is auth code
    if (req.query.code) {
      oauth2Client.getToken(req.query.code, function(err, token) {
        if (err) {
          console.log(
            'Error while trying to retrieve access token',
            err);
          res.send("Error getting token");
        }
        oauth2Client.credentials = token;
        callback(oauth2Client, res);
      });
    } else {
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
          var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
          });
          res.redirect(authUrl);
        } else {
          oauth2Client.credentials = JSON.parse(token);
          // FIX HERE
          callback(oauth2Client, res);
        }
      });
    }
  });
};

function callback(auth, res) {
  res.send("todo show events");
}