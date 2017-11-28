const express = require("express");
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require('mongoose');
const app = express();
require("./models/User");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://eventcodex:eventcodex@ds123311.mlab.com:23311/event-codex');

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['cookiescreit']
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("server port 5000 : hello world");
});

// Configurations
const PORT = process.env.PORT || 5000;
require("./models/Event");
require("./routes/authRoutes")(app);
require("./routes/eventApi")(app);
require("./routes/meetupEventApi")(app);

app.listen(PORT, () => {
    console.log("port 5000 is listen");
});
