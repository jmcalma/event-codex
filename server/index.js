const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server port 5000 : hello world");
});

require("./routes/authRoutes")(app);
require("./routes/eventApi")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("port 5000 is listen");
});
