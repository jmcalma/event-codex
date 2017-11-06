const mongoose = require('mongoose');
const Event = mongoose.model("events");

module.exports = app => {
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

    app.get("/api/event", async (req, res) => {
			const events = await Event.find(function (err, events) {
				if (err) {
					return console.error(err);
				}
				res.send(events);
			})
    });

    app.get("/api/eventdata", function(req, res) {
    	var ID = req.query["ID"];
    	Event.findById(ID).exec(function(event) {
    		res.send(event);
    	})
    });

	app.post("/api/event", async (req, res) => {
		const { host_email, event_name, location, start_date, start_time, end_date, end_time, website_link, event_description, tags } = req.body;
		const event = new Event({
		  host_email,
		  event_name,
		  location,
		  start_date: toDate(start_date, start_time),
		  end_date: toDate(end_date, end_time),
		  event_category: "tech",
		  event_description,
		  tags,
		  website_link,
		  subject: "test"
		});
    try {
      await event.save();
			console.log('saved new event :)');
    } catch (err) {
			console.log('=========  save new event fail! =========');
			console.log(err);
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
  console.log("test: " + year + "-" + month + "-" + day +"T" + hour + ":" + minute + ":00Z");
	return new Date(year + "-" + month + "-" + day +"T" + hour + ":" + minute + ":00Z");
}
