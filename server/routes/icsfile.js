const mongoose = require('mongoose');

module.exports = app => {
    app.get("/icsfile/download", (req, res) => {
      var file = __dirname + '/eventApi.js';
      res.download(file); // Set disposition and send it.
    });
}
