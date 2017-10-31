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
		console.log('====================== body ===============================');
		console.log(req.body);
	});
};
