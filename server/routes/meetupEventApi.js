var request = require("request");
var _ = require("underscore");
const fs = require("fs");
const ics = require("ics");
var groups = [];
var meetupEvents = [];
var optimizedMeetupEventData = [];

module.exports = app => {
    app.get("/api/groups", async (req, res) => {
        getGroupsFromMeetup();
        res.send(groups);
    });

    app.get("/api/meetupEvents", async (req, res) => {
        if(optimizedMeetupEventData.length == 0) {
            getGroupsFromMeetup();
            getEventsFromMeetup();
        }
        res.send(optimizedMeetupEventData);
    });

    app.get("/api/meetupEvents/title/:info", async (req, res) => {
        var url = req.originalUrl;
        var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
        filterByTitle(res, eventFilter);
    });

    app.get("/api/meetupEvents/category/:info", async (req, res) => {
        var url = req.originalUrl;
        var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
        filterByCategory(res, eventFilter);
    });

    app.get("/api/meetupEvents/tag/:info", async (req, res) => {
        var url = req.originalUrl;
        var eventFilter = url.substring(url.lastIndexOf('/') + 1).trim();
        filterByTag(res, eventFilter);
    });

    app.get("/api/meetupEvents/downloadics/:id", (req, res) => {
        var url = req.originalUrl;
        var eventId = url.substring(url.lastIndexOf('/') + 1).trim();
        var event = _.findWhere(meetupEvents, {_id: eventId});
        enableDownload(res, event);
    });
}

function getGroupsFromMeetup() {
    setTimeout(getCareerGroups, 100);
    setTimeout(getCarGroups, 200);
    setTimeout(getFoodGroups, 300);
    setTimeout(getMusicGroups, 400); 
    setTimeout(getSocialGroups, 500);
    setTimeout(getSportsGroups, 600);
    setTimeout(getTechGroups, 700);
}

function getCareerGroups() {
    var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=2&only=name%2Curlname%2Ccategory.name&sig=bfcb6420e2cf880b9d61c94e5f12e0d67628395a";
    request(link, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var importedJSON = JSON.parse(body);
            groups = groups.concat(importedJSON);
            console.log("got career groups");//remove this later
        }
    });
}

function getCarGroups() {
    var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=3&only=name%2Curlname%2Ccategory.name&sig=c34867f7f368d17bb237dcc48af050000898cf5d";
    request(link, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var importedJSON = JSON.parse(body);
            groups = groups.concat(importedJSON);
            console.log("got car groups");//remove this later
        }
    });
}

function getFoodGroups() {
    var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=10&only=name%2Curlname%2Ccategory.name&sig=37a7bd2c3e2d917240d16c42725fe1e59badf1b2";
    request(link, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var importedJSON = JSON.parse(body);
            groups = groups.concat(importedJSON);
            console.log("got food groups");//remove this later
        }
    });
}

function getMusicGroups() {
    var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=21&only=name%2Curlname%2Ccategory.name&sig=7c42b049074997776eb741ba0f8d05978d17412b";
    request(link, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var importedJSON = JSON.parse(body);
            groups = groups.concat(importedJSON);
            console.log("got music groups");//remove this later
        }
    });
}

function getSocialGroups() {
    var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=31&only=name%2Curlname%2Ccategory.name&sig=572b4e7aa0106b8611e5c21a84ff144cd144212a";
    request(link, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var importedJSON = JSON.parse(body);
            groups = groups.concat(importedJSON);
            console.log("got social groups");//remove this later
        }
    });
}

function getSportsGroups() {
    var link = "https://api.meetup.com/find/groups?photo-host=public&page=5&sig_id=240469031&category=32&only=name%2Curlname%2Ccategory.name&sig=3e6c75b2f395d79a61144e838f9b09ed31d4bd58";
    request(link, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var importedJSON = JSON.parse(body);
            groups = groups.concat(importedJSON);
            console.log("got sports groups");//remove this later
        }
    });
}

function getTechGroups() {
    var link = "https://api.meetup.com/find/groups?photo-host=public&page=15&sig_id=240469031&category=34&only=name%2Curlname%2Ccategory.name&sig=b4b53e4756c2081109b9bd658c8e03ee918a13b7";
    request(link, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var importedJSON = JSON.parse(body);
            groups = groups.concat(importedJSON);
            console.log("got tech groups");//remove this later
        }
    });
}

function getEventsFromMeetup() {
    var fullLink = "";
    var linkHalf1 = "https://api.meetup.com/";
    var linkHalf2 = "/events?&sign=true&photo-host=public&page=5&only=id,name,local_date,local_time,venue,group,link,description&key=d182f5649646f23517334541793f72";
    for(let i in groups) {
        fullLink = linkHalf1 + groups[i].urlname + linkHalf2;
        console.log(groups[i].category.name + ": " + groups[i].urlname);
        requestEvents(fullLink, i);
    }
    setTimeout(function() {console.log("done");}, 2000 + (1000*groups.length));//remove this later
    optimizeMeetupEvents();
}

function requestEvents(fullLink, i) {
    var importedJSON;
    setTimeout(function() {
        request(fullLink, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                importedJSON = JSON.parse(body);
                for(var j = 0; j < importedJSON.length; j++) {
                    if(importedJSON[j].hasOwnProperty('venue')) {
                        importedJSON[j].location = "" + importedJSON[j].venue.address_1 + ", " + importedJSON[j].venue.city + ", " + importedJSON[j].venue.state + " " + importedJSON[j].venue.zip;   
                    } else {
                        importedJSON[j].location = "none";
                    }
                    if (groups[i].category.name === "Tech") {
                        importedJSON[j].event_category = "Technology";
                        importedJSON[j].tags = "" + importedJSON[j].event_category + ", " + groups[i].name + ", " + importedJSON[j].location;
                    } else {
                        importedJSON[j].event_category = groups[i].category.name;
                        importedJSON[j].tags = "" + groups[i].category.name + ", " + groups[i].name + ", " + importedJSON[j].location;
                    }
                    importedJSON[j].old = "oldData";
                }
                console.log("iteration: " + i + " seconds: " + (2000 + (1000*i)));//remove this later
                meetupEvents = meetupEvents.concat(importedJSON);
            }
        });
    }, (2000 + (1000*i)));
}

function optimizeMeetupEvents() {
    for (var i in meetupEvents) {
        if (typeof meetupEvents[i].id !== 'undefined') {
            meetupEvents[i]._id = meetupEvents[i].id;
            delete meetupEvents[i].id;
        } else {
            meetupEvents[i]._id = "none";
        }
        if (typeof meetupEvents[i].name !== 'undefined') {
            meetupEvents[i].event_name = meetupEvents[i].name;
            delete meetupEvents[i].name;
        } else {
            meetupEvents[i].event_name = "none";
        }
        if (typeof meetupEvents[i].venue !== 'undefined') {
            meetupEvents[i].location = "" + meetupEvents[i].venue.address_1 + ", " + meetupEvents[i].venue.city + ", " + meetupEvents[i].venue.state + " " + meetupEvents[i].venue.zip;
            delete meetupEvents[i].venue;
        } else {
            meetupEvents[i].location = "none";
        }
        if (typeof meetupEvents[i].local_date !== 'undefined' && typeof meetupEvents[i].local_time !== 'undefined') {
            var dateString = new Date(meetupEvents[i].local_date + "T" + meetupEvents[i].local_time);
            meetupEvents[i].start_date = dateString;
            meetupEvents[i].end_date = meetupEvents[i].start_date;
            delete meetupEvents[i].local_date;
            delete meetupEvents[i].local_time;
        } else {
            var dateString = new Date("2017-01-01T00:00");
            meetupEvents[i].start_date = dateString;
            meetupEvents[i].end_date = dateString;
        }
        if (typeof meetupEvents[i].description !== 'undefined') {
            meetupEvents[i].event_description = meetupEvents[i].description;
            delete meetupEvents[i].description;
        } else {
            meetupEvents[i].event_description = "none";
        }
        if (typeof meetupEvents[i].link == 'undefined') {
            meetupEvents[i].link = "none";
        }
        if (typeof meetupEvents[i].group !== 'undefined') {
            meetupEvents[i].group_name = meetupEvents[i].group.name;
        } else {
            meetupEvents[i].group_name = "none";
        }
        delete meetupEvents[i].old;
    }
    optimizedMeetupEventData = meetupEvents;
}

function filterByCategory(res, eventFilter) {
    var filtered = filterItemsForCategory(eventFilter);
    res.send(filtered);
}

function filterItemsForCategory(eventFilter) {
    var list = _.filter(optimizedMeetupEventData, function(event) {
        var cat = event.event_category;
        cat = cat.toLowerCase();
        return cat.indexOf(eventFilter.toLowerCase()) >= 0;
    });
    return list;
}

function filterByTag(res, eventFilter) {
    var filtered = filterItemsForTag(eventFilter);
    res.send(filtered);
}

function filterItemsForTag(eventFilter) {
    var list = _.filter(optimizedMeetupEventData, function(event) {
        var cat = event.tags;
        cat = cat.toLowerCase();
        return cat.indexOf(eventFilter.toLowerCase()) >= 0;
    });
    return list;
}

function filterByTitle(res, eventFilter) {
    var filtered = filterItemsForTitle(eventFilter);
    res.send(filtered);
}

function filterItemsForTitle(eventFilter) {
    var list = _.filter(optimizedMeetupEventData, function(event) {
        var cat = event.event_name;
        cat = cat.toLowerCase();
        return cat.indexOf(eventFilter.toLowerCase()) >= 0;
    });
    return list;
}

function enableDownload(res, event) {
    var title = event.event_name;
    var description = event.event_description;
    var startYear = event.start_date.getUTCFullYear();
    var startMonth = event.start_date.getUTCMonth() + 1;
    var startDate = event.start_date.getUTCDate();
    var startHour = event.start_date.getUTCHours();
    var startMin = event.start_date.getUTCMinutes();
    var endYear = event.end_date.getUTCFullYear();
    var endMonth = event.end_date.getUTCMonth() + 1;
    var endDate = event.end_date.getUTCDate();
    var endHour = event.end_date.getUTCHours();
    var endMin = event.end_date.getUTCMinutes();
    var location = event.location;
    var categories = [event.event_category];
    var fileName = __dirname + "/codex.ics";
    ics.createEvent({
        title,
        description,
        start: [startYear, startMonth, startDate, startHour, startMin],
        duration: {
            days: endDate - startDate,
            hours: endHour - startHour,
            minutes: endMin - startMin
        },
        location,
        categories
    }, (error, value) => {
        if (error) {
            throw new Exception('Create ics file fail');
        }
        fs.writeFileSync(fileName, value);
        res.download(fileName, function(err) {
            if (err) {
                console.log(err);
            } else {
                fs.unlink(fileName, function(err) {
                    if (err) throw err;
                });
            }
        });
    });
}
