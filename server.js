// Create a HTTP server on port 8000
// Send plain text headers and 'Hello World' to each client

var http = require('http');
var port = process.env.PORT || 8000;

var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password');

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});


var counter = 0;

http.createServer(function (req, res) {

	// increment the counter for each visitor request
  sequelize.sync()

  var path = req.url;
  console.log("requested=" + path + " counter=" + counter);

  res.writeHead(200, {'Content-Type': 'text/html'}); // prepare response headers

  if (path == "/") {
  	res.end("Welcome to startup-bygden! Find your startup spot in bygden!");

  } else if (path == "/page2") {
  	res.end("This is page 2. <a href='/'>Back.</a>\n"); // send response and close connection
  }

}).listen(port);

// console info message
console.log('Server running at http://127.0.0.1:' + port);
