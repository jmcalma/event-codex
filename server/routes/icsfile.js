const mongoose = require("mongoose");
const fs = require("fs");
const ics = require("ics");
const Event = mongoose.model("events");

module.exports = app => {
  app.get("/api/download/icsfile/:id", (req, res) => {
    var url = req.originalUrl;
    var eventId = url.substring(url.lastIndexOf('/') + 1).trim();
    // find sepecific id from database and enable downloading
    Event.findOne({_id: eventId}, function (err, event) {
        enableDownload(res, event);
    });
  });
};

// helper function for downloading
function enableDownload(res, event) {
    console.log("event: " + event);
    var title = event.event_name;
    var description = event.event_description;
    var startYear = event.start_date.getFullYear();
    var startMonth = event.start_date.getMonth() + 1;
    var startDate = event.start_date.getDate();
    var startHour = event.start_date.getUTCHours();
    var startMin = event.start_date.getMinutes();
    console.log("start: " + startYear + "-" + startMonth + "-" + startDate + "-" + startHour + "-" + startMin);
    var endYear = event.end_date.getFullYear();
    var endMonth = event.end_date.getMonth() + 1;
    var endDate = event.end_date.getDate();
    var endHour = event.end_date.getUTCHours();
    var endMin = event.end_date.getMinutes();
    console.log("end: " + endYear + "-" + endMonth + "-" + endDate + "-" + endHour + "-" + endMin);

    var fileName = __dirname + "/codex.ics";
    ics.createEvent(
      {
        title,
        description,
        start: [startYear, startMonth, startDate, startHour, startMin],
        duration: { hours: 1, minutes: 35 }
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
            fs.unlink(fileName, function(err) { if (err) throw err; });
          }
        });
      }
    );
}
