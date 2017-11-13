var request = require("request")
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
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=2&only=urlname&sig=e2afcb5cee4e60891a97f3b3bbe3aaab02ad414e";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
        console.log(importedJSON);
      }
  })
}

function getCarGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=3&only=urlname&sig=b951fc9bf8c67175e7ade00a3c6ec4b720ab9f7c";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
        console.log(importedJSON);
      }
  })
}

function getFoodGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=10&only=urlname&sig=a3b573eac262ccada616213d28977d5c64a46498";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
        console.log(importedJSON);
      }
  })
}

function getMusicGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=21&only=urlname&sig=cc3333adcc50b927fd5a07ff450745f540774b46";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
        console.log(importedJSON);
      }
  })
}

function getSocialGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=31&only=urlname&sig=ae85a6e15f2e80be1c333009a1c95978a2a4072a";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
        console.log(importedJSON);
      }
  })
}

function getSportsGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=10&sig_id=240469031&category=32&only=urlname&sig=07c3d78353a5cdf25df3d5c361a167382f6ad161";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
        console.log(importedJSON);
      }
  })
}

function getTechGroups() {
  var link = "https://api.meetup.com/find/groups?photo-host=public&page=50&sig_id=240469031&category=34&only=urlname&sig=02bf65fd813cc9b9600a80d07aee3a43da37de51";
  request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var importedJSON = JSON.parse(body);
        groups = groups.concat(importedJSON);
        console.log(importedJSON);
      }
  })
}

function getEventsFromMeetup() {
  var importedJSON;
  var fullLink = "";
  var linkHalf1 = "https://api.meetup.com/";
  var linkHalf2 = "/events?&sign=true&photo-host=public&page=20&key=d182f5649646f23517334541793f72";
  fullLink = linkHalf1 + groups[0].urlname + linkHalf2;
  console.log(groups.length);
  console.log(fullLink);
  for(var i in groups) {
    fullLink = linkHalf1 + groups[i].urlname + linkHalf2;
    request(fullLink, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          importedJSON = JSON.parse(body);
          meetupEvents = meetupEvents.concat(importedJSON);
          console.log(importedJSON);
        }
    })
  }
}