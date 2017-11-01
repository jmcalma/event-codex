var events = require('./../dataBase/events');
const mongoose = require('mongoose');
const Event = mongoose.model("events");

module.exports = app => {
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

    app.get("/api/event", (req, res) => {
      res.send(events);
    });

	app.post("/api/event", async (req, res) => {
		const { email, title, location, start_date, start_time, end_date, end_time, website, description, tags } = req.body;
		var newEvent = {
          "host_email" : email,
          "event_name": title,
          "location" : location,
          "start_date" : start_date,
          "start_time": start_time,
          "end_date" : end_date,
          "end_time": end_time,
          "event_category" : website,
          "event_description": description,
          "tags" : tags
		}
		console.log("new event: " + newEvent.host_email);
		console.log("new event: " + newEvent.event_name);
		console.log("new event: " + newEvent.location);
		console.log("new event: " + newEvent.start_date);
		console.log("new event: " + newEvent.start_time);
	});
};
