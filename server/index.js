const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const authorize = require('./google_calendar');

// Configurations
const PORT = process.env.PORT || 5000;
require("./models/Event");
require("./routes/authRoutes")(app);
require("./routes/eventApi")(app);
require("./routes/icsfile")(app);
require("./routes/meetupEventApi")(app);

mongoose.connect('mongodb://eventcodex:eventcodex@ds123311.mlab.com:23311/event-codex');
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server port 5000 : hello world");
});

app.get("/google-calendar-auth", function (req, res) {
	fs.readFile('client_secret.json', function processClientSecrets(err, content) {
	  if (err) {
	    console.log('Error loading client secret file: ' + err);
	    return;
	  }
	 let events = [];
	  authorize(JSON.parse(content), function(auth) {
	  	function listEvents(auth) {
		  var calendar = google.calendar('v3');
		  calendar.events.list({
		    auth: auth,
		    calendarId: 'primary',
		    timeMin: (new Date()).toISOString(),
		    maxResults: 10,
		    singleEvents: true,
		    orderBy: 'startTime'
		  }, function(err, response) {
		    if (err) {
		      console.log('The API returned an error: ' + err);
		      return;
		    }
		    var events = response.items;
		    if (events.length == 0) {
		      console.log('No upcoming events found.');
		    } else {
		      console.log('Upcoming 10 events:');
		      for (var i = 0; i < events.length; i++) {
		        var event = events[i];
		        var start = event.start.dateTime || event.start.date;
		        events.add(`${start} - ${event.summary}`);
		        console.log('%s - %s', start, event.summary);
		      }
		    }
		  });
		}
	  });
	});
})

app.listen(PORT, () => {
  console.log("port 5000 is listen");
});
