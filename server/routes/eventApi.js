var events = require('./../dataBase/events');

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
		console.log("email: " + email);
		console.log("title: " + title);
		console.log("location: " + location);
		console.log("start date: " + start_date);
		console.log("start time: " + start_time);
		console.log("end date: " + end_date);
		console.log("end time: " + end_time);
		console.log("website: " + website);
		console.log("description: " + description);
		console.log("tags: " + tags);
	});
};
