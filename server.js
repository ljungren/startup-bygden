var request = require('request');
var config = require('./config')



// request(config.endpoint, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// request.post(config.endpoint).form({'x-api':config.apikey});

request
  .get(config.endpoint).form({'x-api':config.apikey})
  .on('error', function(err) {
    console.log(err)
  })
  .on('response', function(response, body) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
    var jsonObj = x2js.xml_str2json(body);
    console.log('body:', jsonObj);
  })
