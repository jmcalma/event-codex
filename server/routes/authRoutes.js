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