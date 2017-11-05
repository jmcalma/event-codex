var events = require('./../dataBase/events');
const mongoose = require('mongoose');
const Event = mongoose.model("events");

module.exports = app => {
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

    app.get("/api/event", async (req, res) => {
      // res.send(events);
			const events = await Event.find(function (err, events) {
				if (err) {
					return console.error(err);
				}
				res.send(events);
			})
    });

	app.post("/api/event", async (req, res) => {
		const { email, title, location, start_date, start_time, end_date, end_time, website, description, tags } = req.body;
		// var startDate = start_date.split("-");
		// var year = startDate[0];
		// var month = startDate[1];
		// var day = startDate[2];
		//
		// console.log(year + ":" + month + ":" + day);
		// var startTime = start_time.split(":");
		// var hour = parseInt(startTime[0]);
		// var second = startTime[1].substring(0, 2);
		// var period = start_time.split(" ")[1];
		// if (period == "pm") {
		// 	hour += 12;
		// }
		var startDate = toDate(start_date, start_time);
		console.log(startDate);
		const event = new Event({
		  host_email: email,
		  event_name: title,
		  location: location,
		  start_date: Date.now(),
		  end_date: Date.now(),
		  event_category: "test",
		  event_description: description,
		  tags: tags,
		  website_link: website,
		  subject: "test"
		});
    try {
      await event.save();
			console.log('saved new event :)');
    } catch (err) {
			console.log('save new event fail!');
    }
	});
};

function toDate(date, time) {
	var dateArray = date.split("-");
	var year = dateArray[0];
	var month = dateArray[1];
	var day = dateArray[2];

	var timeArray = time.split(":");
	var hour = parseInt(timeArray[0]);
	var minute = timeArray[1].substring(0, 2);
	if (time.split(" ")[1] == "pm") {
		hour += 12;
	}
	console.log(year+ month + ":" + day + ":" + hour + ":" + minute);
	return new Date(year + "-" + month + "-" + day +"T" + hour + ":" + minute + ":00Z");
}
