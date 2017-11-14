const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Configurations
const PORT = process.env.PORT || 5000;
require("./models/Event");
require("./routes/authRoutes")(app);
require("./routes/eventApi")(app);
require("./routes/icsfile")(app);
require("./routes/meetupEventApi")(app);

mongoose.connect('mongodb://walkerzheng:Zh19950513@ds123311.mlab.com:23311/event-codex');
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server port 5000 : hello world");
});

app.listen(PORT, () => {
  console.log("port 5000 is listen");
});
