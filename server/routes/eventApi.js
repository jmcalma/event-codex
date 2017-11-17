const mongoose = require('mongoose');
const Event = mongoose.model("events");
const fs = require("fs");
const ics = require("ics");

module.exports = app => {
		app.use(function(req, res, next) {
		  res.header("Access-Control-Allow-Origin", "*");
		  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		  next();
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
				console.log('========= saved new event :) =========');
	    } catch (err) {
				console.log('=========  save new event fail! =========');
				console.log(err);
	    }
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

		// get events based on title name
    app.get("/api/event/title/:info", async (req, res) => {
	    var url = req.originalUrl;
	    var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
			filterByTitle(res, eventFilter);
    });

		// get events based on category name
    app.get("/api/event/category/:info", async (req, res) => {
	    var url = req.originalUrl;
	    var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
			filterByCategory(res, eventFilter);
		});

		// get events with specific tag
    app.get("/api/event/tag/:info", async (req, res) => {
	    var url = req.originalUrl;
	    var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
			filterByTag(res, eventFilter);
		});

	  app.get("/api/event/downloadics/:id", (req, res) => {
	    var url = req.originalUrl;
	    var eventId = url.substring(url.lastIndexOf('/') + 1).trim();
	    // find sepecific id from database and enable downloading
	    Event.findOne({_id: eventId}, function (err, event) {
	        enableDownload(res, event);
	    });
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
	const events = Event.find({event_category: { $regex: eventFilter, $options: 'i'}}, function (err, events) {
		if (err) {
			throw new Exception('getting event problem');
		}
		res.send(events);
	});
}

function filterByTag(res, eventFilter) {
	const events = Event.find({tags: { $regex: eventFilter, $options: 'i'}}, function (err, events) {
		if (err) {
			res.send('error');
		}
		res.send(events);
	})
}

function filterByTitle(res, eventFilter) {
	const events = Event.find({event_name: { $regex: eventFilter, $options: 'i'}}, function (err, events) {
		if (err) {
			res.send('error');
		}
		res.send(events);
	});
}

// helper function for downloading
function enableDownload(res, event) {
    console.log("event: " + event);
    var title = event.event_name;
    var description = event.event_description;
    var startYear = event.start_date.getUTCFullYear();
    var startMonth = event.start_date.getUTCMonth() + 1;
    var startDate = event.start_date.getUTCDate();
    var startHour = event.start_date.getUTCHours();
    var startMin = event.start_date.getUTCMinutes();
    console.log("start: " + startYear + "-" + startMonth + "-" + startDate + "-" + startHour + "-" + startMin);
    var endYear = event.end_date.getUTCFullYear();
    var endMonth = event.end_date.getUTCMonth() + 1;
    var endDate = event.end_date.getUTCDate();
    var endHour = event.end_date.getUTCHours();
    var endMin = event.end_date.getUTCMinutes();
    console.log("end: " + endYear + "-" + endMonth + "-" + endDate + "-" + endHour + "-" + endMin);
    var location = event.location;
    var categories = [event.event_category];

    var fileName = __dirname + "/codex.ics";
    ics.createEvent(
      {
        title,
        description,
        start: [startYear, startMonth, startDate, startHour, startMin],
        duration: { days: endDate - startDate, hours: endHour - startHour, minutes: endMin - startMin },
        location,
        categories
      },
      (error, value) => {
        if (error) {
          throw new Exception('Create ics file fail');
        }
        // write file in server
        fs.writeFileSync(fileName, value);
        // user start to download the file from server
        res.download(fileName, function(err) {
          if (err) {
            console.log(err);
          } else {
            // if user download success, then delet file in server
            fs.unlink(fileName, function(err) { if (err) throw err; });
          }
        });
      }
    );
}
