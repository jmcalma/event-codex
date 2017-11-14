const mongoose = require('mongoose');
const Event = mongoose.model("events");
var request = require("request")
var groups = [{urlname: 'scwa-oc'}];

module.exports = app => {
		app.use(function(req, res, next) {
		  res.header("Access-Control-Allow-Origin", "*");
		  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		  next();
		});

		// api where get all events from out own database
    app.get("/api/event", async (req, res) => {
			const events = await Event.find(function (err, events) {
				if (err) {
					return console.error(err);
				}
				res.send(events);
			})
    });

		//	api where filter all info user want
    // app.get("/api/event/:filter/:info", async (req, res) => {
	  //   var url = req.originalUrl.split('/');
		// 	var filter = url[url.length - 2];
		// 	var info = url[url.length - 1];
		// 	console.log(filter + ' - ' + info);
		// 	filterInfo(res, filter, info);
    // });

    app.get("/api/event/title/:title", async (req, res) => {
	    var url = req.originalUrl;
	    var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
			filterByTitle(res, eventFilter);
    });

    app.get("/api/event/category/:title", async (req, res) => {
	    var url = req.originalUrl;
	    var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
			filterByCategory(res, eventFilter);
		});

    app.get("/api/event/tag/:title", async (req, res) => {
	    var url = req.originalUrl;
	    var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
			filterByTag(res, eventFilter);
		});

		// get event information from client and update our database
		app.post("/api/event", async (req, res) => {
			const { host_email, event_name, location, start_date, start_time, end_date, end_time, website_link, event_category, event_description, tags } = req.body;
			const event = new Event({
			  host_email,
			  event_name,
			  location,
			  start_date: toDate(start_date, start_time),
			  end_date: toDate(end_date, end_time),
				event_category,
			  event_description,
			  tags,
			  website_link
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
	} else if (hour < 10) {
		hour = "0" + hour.toString();
	}
  console.log("test: " + year + "-" + month + "-" + day +"T" + hour + ":" + minute + ":00Z");
	return new Date(year + "-" + month + "-" + day +"T" + hour + ":" + minute + ":00Z");
	// return new Date(year, month, day, hour, minute);
}

function filterByCategory(res, eventFilter) {
	var categoriesArray = ["careerandbusiness", "carsandmotorcyles", "foodanddrink", "music",
		"socializing", "sportsandrecreation", "tech"];
	if (categoriesArray.includes(eventFilter)) {
		const events = Event.find({event_category: eventFilter}, function (err, events) {
			if (err) {
				throw new Exception('getting event problem');
			}
			res.send(events);
		})
	} else {
		console.log(eventFilter + " is invalid category.");
	}
}

function filterByTag(res, eventFilter) {
	const events = Event.find({tags: eventFilter}, function (err, events) {
		if (err) {
			throw new Exception('getting event problem');
		}
		res.send(events);
	})
}

function filterByTitle(res, eventFilter) {
	const events = Event.find({event_name: eventFilter}, function (err, events) {
		if (err) {
			throw new Exception('Getting data from title : fail');
		}
		res.send(events);
	});
}

function filterInfo(res, filter, info) {
	if (filter === "category") {
		filter = "event_name";
	} else if (filter === "tag") {
		filter = "tags";
	} else if (filter === "title") {
		filter = "event_name";
	} else {
		console.log('fail');
		return;
	}
	console.log(filter);
	const events = Event.find({filter: info}, function (err, events) {
		if (err) {
			throw new Exception('Getting data from filtering : fail');
		}
		res.send(events);
	});
}
