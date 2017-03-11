// Create a HTTP server on port 8000
// Send plain text headers and 'Hello World' to each client

var db      = require('./models');

var http = require('http');
var port = process.env.PORT || 8000;


var counter = 0;

db.sequelize.sync().then(function() {
  http.createServer(function (req, res) {

  	// increment the counter for each visitor request

    var path = req.url;
    console.log("requested=" + path + " counter=" + counter);

    res.writeHead(200, {'Content-Type': 'text/html'}); // prepare response headers

    if (path == "/") {
    	res.end("Welcome to startup-bygden! Find your startup spot in bygden!");

    } else if (path == "/seemunicipalities") {
      var data = db.Municipality.findAll().then(function(munic) {
        var data = JSON.stringify(munic)
        res.end(data); // send response and close connection
      })
    } else if (path == "/importsquares") {


      // JAKOBS CODE HERE


    }

  }).listen(port);
});


// console info message
console.log('Server running at http://127.0.0.1:' + port);
