const mongoose = require("mongoose");
const fs = require("fs");
const ics = require("ics");

module.exports = app => {
  app.get("/api/download/icsfile/:id", (req, res) => {
    var fileName = __dirname + "/codex.ics";

    ics.createEvent(
      {
        title: "Dinner",
        description: "Turkey is the best",
        start: [2018, 1, 15, 6, 30],
        duration: { minutes: 50 }
      },
      (error, value) => {
        if (error) {
          console.log(error);
        }
        // write file in server
        fs.writeFileSync(fileName, value);
        // user start to download the file from server
        res.download(fileName, function(err) {
          if (err) {
            console.log(err);
          } else {
            // if user download success, then delet file in server
            fs.unlink(fileName, function(err) {
              if (err) throw err;
            });
          }
        });
      }
    );
  });
};
