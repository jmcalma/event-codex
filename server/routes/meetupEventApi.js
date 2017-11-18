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
}

function getGroupsFromMeetup() {
    getCareerGroups();
    getCarGroups();
    getFoodGroups();
    getMusicGroups(); 
    getSocialGroups();
    getSportsGroups();
    getTechGroups();
}

function getCareerGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=2&only=name%2Curlname%2Ccategory.name&sig=296c96de97a5f0a296afd0a919dcf29fc07dd2ed";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getCarGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=3&only=name%2Curlname%2Ccategory.name&sig=73d58e500323ad945eb1394583941c9f1c77f12b";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getFoodGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=10&only=name%2Curlname%2Ccategory.name&sig=fc07e6f3f67c4dc878481427630f8ebb98181069";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getMusicGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=21&only=name%2Curlname%2Ccategory.name&sig=05b05627236a1cf2827e48ee5649bb0859d2ffaf";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getSocialGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=31&only=name%2Curlname%2Ccategory.name&sig=2bb209ae2fb7b903bbef6f49e91abbc489be7e78";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getSportsGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=32&only=name%2Curlname%2Ccategory.name&sig=420271546d52b3aae9b85301f31ecb2f61501bb6";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getTechGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=50&sig_id=240469031&category=34&only=name%2Curlname%2Ccategory.name&sig=304248f2ace2df0729baf054ed48cc52fdc50fa0";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
      }
  })
}

function getEventsFromMeetup() {
  var importedJSON;
  var fullLink = "";
  var linkHalf1 = "https://api.meetup.com/";
  var linkHalf2 = "/events?&sign=true&photo-host=public&page=20&only=name,local_date,local_time,venue,group.name,link,description&key=d182f5649646f23517334541793f72";
  for(var i in groups) {
    fullLink = linkHalf1 + groups[i].urlname + linkHalf2;
    request(fullLink, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          importedJSON = JSON.parse(body);
          meetupEvents = meetupEvents.concat(importedJSON);
          for(var j in meetupEvents) {
            meetupEvents[j].event_category = groups[i].category;
            meetupEvents[j].tags = "" + groups[i].category + "," + groups[i].name;
          }
        }
    })
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