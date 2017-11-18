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
      optimizeMeetupEvents();
      res.send(meetupEvents);
    });
}

function getGroupsFromMeetup() {
    setTimeout(getCareerGroups(), 2000);
    setTimeout(getCarGroups(), 2000);
    setTimeout(getFoodGroups(), 2000);
    setTimeout(getMusicGroups(), 2000); 
    setTimeout(getSocialGroups(), 2000);
    setTimeout(getSportsGroups(), 2000);
    setTimeout(getTechGroups(), 2000);
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
  var counter = 0;
  var importedJSON;
  var fullLink = "";
  var linkHalf1 = "https://api.meetup.com/";
  var linkHalf2 = "/events?&sign=true&photo-host=public&page=5&only=name,local_date,local_time,venue,group,link,description&key=d182f5649646f23517334541793f72";
  for(var i in groups) {
    fullLink = linkHalf1 + groups[i].urlname + linkHalf2;
    setTimeout(request(fullLink, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  importedJSON = JSON.parse(body);
                  meetupEvents = meetupEvents.concat(importedJSON);
                  for(j = counter; j < meetupEvents.length; j++) {
                    meetupEvents[j].group = groups[i].name;
                    meetupEvents[j].event_category = groups[i].category.name;
                    meetupEvents[j].tags = "" + meetupEvents[j].event_category + "," + groups[i].name;
                    counter++;
                  }
                }
               }), 5000);
  }
  console.log(meetupEvents);
}

function optimizeMeetupEvents() {
    for(var i in meetupEvents) {
        meetupEvents[i].event_name = meetupEvents[i].name;
        delete meetupEvents[i].name;
        meetupEvents[i].location = "" + meetupEvents[i].venue.address_1 + ", " + meetupEvents[i].venue.city + ", " + meetupEvents[i].venue.state + " " + meetupEvents[i].venue.zip;
        delete meetupEvents[i].venue;
        meetupEvents[i].start_date = "" + meetupEvents[i].local_date + "T" + meetupEvents[i].local_time + ":00.000Z";
        meetupEvents[i].end_date = meetupEvents[i].start_date;
        delete meetupEvents[i].local_date;
        delete meetupEvents[i].local_time;
        meetupEvents[i].event_description = meetupEvents[i].description;
        delete meetupEvents[i].description;
        meetupEvents[i].website_link = meetupEvents[i].link;
        delete meetupEvents[i].link;
        meetupEvents[i].group_name = meetupEvents[i].group.name;
        delete meetupEvents[i].group;
    }
}

// function filterByCategory(res, eventFilter, index) {
//     var filtered = _.where(meetupEvents, {groups[index].category: eventFilter});
//     res.send(filtered);
// }

// function filterByTag(res, eventFilter, index) {
//     var filtered = _.where(meetupEvents, {groups[index].tags: eventFilter});
//     res.send(filtered);
// }

// function filterByTitle(res, eventFilter, index) {
//     var filtered = _.where(meetupEvents, {groups[index].name: eventFilter});
//     res.send(filtered);
// }