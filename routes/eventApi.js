var events = require('./../dataBase/events');

module.exports = app => {
    app.get("/api/event", (req, res) => {
      res.send(events);
    });
};
