const mongoose = require('mongoose');
var fs = require('fs');

module.exports = app => {
    app.get("/download/icsfile/:id", (req, res) => {
      fs.appendFile('codex.ics', 'This is test file', function (err) {
        if(err) throw err;
      })
      var file = __dirname + '/../codex.ics';
      res.download(file); // Set disposition and send it.

    });
}
