var request = require("request")
var groups = [{urlname: 'scwa-oc'}];
var meetupEvents = [];

module.exports = app => {
    app.get("/api/groups", async (req, res) => {
			getGroups();
			res.send(groups);
    });

    app.get("/api/meetupEvents", async (req, res) => {
			getEventsFromMeetup();
			res.send(meetupEvents);
    });
}

function getGroups() {
	var link = "https://api.meetup.com/find/groups?photo-host=public&page=50&sig_id=240469031&category=34&only=urlname&sig=02bf65fd813cc9b9600a80d07aee3a43da37de51";
	request(link, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
     		var importedJSON = JSON.parse(body);
     		groups = groups.concat(importedJSON);
     		console.log(importedJSON);
  		}
	})
}

function getEventsFromMeetup() {
	var link = "https://api.meetup.com/HackerNestOC/events?photo-host=public&page=5&sig_id=240469031&only=name%2Cvenue%2Clocal_date%2Clocal_time%2Clink%2Cdescription&sig=d6fcf182f489d043b816b3ed4bfc76ad6ff0e962";
	request(link, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
     		var importedJSON = JSON.parse(body);
     		meetupEvents = meetupEvents.concat(importedJSON);
     		console.log(importedJSON);
  		}
	})
}
