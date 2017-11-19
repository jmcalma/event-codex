var request = require("request");
var _ = require("underscore");
var groups = [];
var meetupEvents = [];

module.exports = app => {
    app.get("/api/groups", async (req, res) => {
      getGroupsFromMeetup();
      res.send(groups);
    });

    app.get("/api/meetupEvents", async (req, res) => {
      getGroupsFromMeetup();
      getEventsFromMeetup();
      res.send(meetupEvents);
    });

    // app.get("/api/event/title/:info", async (req, res) => {
    //     var url = req.originalUrl;
    //     var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
    //         filterByTitle(res, eventFilter);
    // });

    // app.get("/api/event/category/:info", async (req, res) => {
    //     var url = req.originalUrl;
    //     var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
    //         filterByCategory(res, eventFilter);
    //     });

    // app.get("/api/event/tag/:info", async (req, res) => {
    //     var url = req.originalUrl;
    //     var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
    //         filterByTag(res, eventFilter);
    //     });
    // app.get("/api/event/downloadics/:id", (req, res) => {
    //   var url = req.originalUrl;
    //   var eventId = url.substring(url.lastIndexOf('/') + 1).trim();
    //   var event = _.where(meetupEvents, {meetupEvents.event_name: eventId})
    //   enableDownload(res, event);
    // });
}

function getGroupsFromMeetup() {
    setTimeout(getCareerGroups, 1000);
    setTimeout(getCarGroups, 1000);
    setTimeout(getFoodGroups, 1000);
    setTimeout(getMusicGroups, 1000); 
    setTimeout(getSocialGroups, 1000);
    setTimeout(getSportsGroups, 1000);
    setTimeout(getTechGroups, 1000);
}

function getCareerGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=2&only=name%2Curlname%2Ccategory.name&sig=bfcb6420e2cf880b9d61c94e5f12e0d67628395a";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getCarGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=3&only=name%2Curlname%2Ccategory.name&sig=c34867f7f368d17bb237dcc48af050000898cf5d";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getFoodGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=10&only=name%2Curlname%2Ccategory.name&sig=37a7bd2c3e2d917240d16c42725fe1e59badf1b2";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getMusicGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=21&only=name%2Curlname%2Ccategory.name&sig=7c42b049074997776eb741ba0f8d05978d17412b";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getSocialGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=31&only=name%2Curlname%2Ccategory.name&sig=572b4e7aa0106b8611e5c21a84ff144cd144212a";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getSportsGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=32&only=name%2Curlname%2Ccategory.name&sig=3e6c75b2f395d79a61144e838f9b09ed31d4bd58";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getTechGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=15&sig_id=240469031&category=34&only=name%2Curlname%2Ccategory.name&sig=b4b53e4756c2081109b9bd658c8e03ee918a13b7";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getEventsFromMeetup() {
    var stop;
    var seconds = 0;
    var counter = 0;
    var importedJSON;
    var fullLink = "";
    var linkHalf1 = "https://api.meetup.com/";
    var linkHalf2 = "/events?&sign=true&photo-host=public&page=5&only=name,local_date,local_time,venue,group,link,description&key=d182f5649646f23517334541793f72";
    for(let i = 0; i < 1; i++) {
        fullLink = linkHalf1 + groups[i].urlname + linkHalf2;
        console.log(fullLink);
        request(fullLink, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                importedJSON = JSON.parse(body);
                if(i == 30) {
                    stop = 15;
                } else {
                    stop = 5;
                }
                for(var j = 0; j < (i*counter) + stop; j++) {
                    importedJSON[j].event_category = groups[i].category.name;
                    importedJSON[j].tags = "" + groups[i].category.name + ", " + groups[i].name;
                    counter++;
                }
                if(counter % 10 == 0) {
                    seconds = 5000;
                } else {
                    seconds = 0;
                }
                meetupEvents = meetupEvents.concat(importedJSON);
                console.log(importedJSON);
                optimizeMeetupEvents();
                console.log(meetupEvents);
                setTimeout(function() {console.log("waiting: " + seconds + " seconds");}, seconds);
                console.log("counter: " + counter + "  seconds: " + seconds);
            }
        });
    }
}

function optimizeMeetupEvents() {
    for(var i in meetupEvents) {
        if(typeof meetupEvents[i].name !== 'undefined') {
            meetupEvents[i].event_name = meetupEvents[i].name;
            delete meetupEvents[i].name;
        }
        if(typeof meetupEvents[i].venue !== 'undefined') {
            meetupEvents[i].location = "" + meetupEvents[i].venue.address_1 + ", " + meetupEvents[i].venue.city + ", " + meetupEvents[i].venue.state + " " + meetupEvents[i].venue.zip;
            delete meetupEvents[i].venue;
        }
        if(typeof meetupEvents[i].local_date !== 'undefined' && typeof meetupEvents[i].local_time !== 'undefined') {
            meetupEvents[i].start_date = "" + meetupEvents[i].local_date + "T" + meetupEvents[i].local_time + ":00.000Z";
            meetupEvents[i].end_date = meetupEvents[i].start_date;
            delete meetupEvents[i].local_date;
            delete meetupEvents[i].local_time;
        }
        if(typeof meetupEvents[i].description !== 'undefined') {
            meetupEvents[i].event_description = meetupEvents[i].description;
            delete meetupEvents[i].description;
        }
        if(typeof meetupEvents[i].link !== 'undefined') {
            meetupEvents[i].website_link = meetupEvents[i].link;
            delete meetupEvents[i].link;
        }
        if(typeof meetupEvents[i].group !== 'undefined') {
            meetupEvents[i].group_name = meetupEvents[i].group.name;
            delete meetupEvents[i].group;
        }
    }

      console.log("optimizing meetupEvents");///////////
}

// function filterByCategory(res, eventFilter) {
//     var filtered = _.where(meetupEvents, {meetupEvents.event_category: eventFilter});
       // if (err) {
       //      res.send('error');
       //  }
//     res.send(filtered);
// }

// function filterByTag(res, eventFilter) {
//     var filtered = _.where(meetupEvents, {meetupEvents.tags: eventFilter});
        // if (err) {
        //     res.send('error');
        // }
//     res.send(filtered);
// }

// function filterByTitle(res, eventFilter) {
//     var filtered = _.where(meetupEvents, {meetupEvents.event_name: eventFilter});
       // if (err) {
       //      res.send('error');
       //  }
//     res.send(filtered);
// }
// function enableDownload(res, event) {
//     var title = event.event_name;
//     var description = event.event_description;
//     var startYear = event.start_date.getUTCFullYear();
//     var startMonth = event.start_date.getUTCMonth() + 1;
//     var startDate = event.start_date.getUTCDate();
//     var startHour = event.start_date.getUTCHours();
//     var startMin = event.start_date.getUTCMinutes();
//     var endYear = event.end_date.getUTCFullYear();
//     var endMonth = event.end_date.getUTCMonth() + 1;
//     var endDate = event.end_date.getUTCDate();
//     var endHour = event.end_date.getUTCHours();
//     var endMin = event.end_date.getUTCMinutes();
//     var location = event.location;
//     var categories = [event.event_category];

//     var fileName = title + "/codex.ics";
//     ics.createEvent(
//       {
//         title,
//         description,
//         start: [startYear, startMonth, startDate, startHour, startMin],
//         duration: { days: endDate - startDate, hours: endHour - startHour, minutes: endMin - startMin },
//         location,
//         categories
//       },
//       (error, value) => {
//         if (error) {
//           throw new Exception('Create ics file fail');
//         }
//         fs.writeFileSync(fileName, value);
//         res.download(fileName, function(err) {
//           if (err) {
//             console.log(err);
//           } else {
//             fs.unlink(fileName, function(err) { if (err) throw err; });
//           }
//         });
//       }
//     );
// }
