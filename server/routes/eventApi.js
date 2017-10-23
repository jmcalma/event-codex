var events = require('./../dataBase/events');

module.exports = app => {
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

    app.get("/api/event", (req, res) => {
      var output = "";
      var date;
	  var hours;
      var minutes;
      for(i = 0; i <= 2; i++) {
      	date = new Date(JSON.stringify(events[i].time));
      	hours = date.getHours();
      	minutes = date.getMinutes();
      	output = output + "event name: " + JSON.stringify(events[i].name) + "<br>" 
      		+ "time: " + JSON.stringify(events[i].time) + "<br>"
      		+ "address: " + JSON.stringify(events[i].venue.address_1) + " "
      		+ JSON.stringify(events[i].venue.city) + ", " + JSON.stringify(events[i].venue.state) + "<br>"
      		+ "description: " + JSON.stringify(events[i].description)
      		+ "link: " + JSON.stringify(events[i].link) + "<br><br>";
      }
      res.send(output);
      
    });
};
