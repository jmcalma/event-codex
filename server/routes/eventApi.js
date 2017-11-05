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
		const event = new Event({
		  host_email: email,
		  event_name: title,
		  location: location,
		  start_date: Date.now(),
		  start_time,
		  end_date: Date.now(),
		  end_time,
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
