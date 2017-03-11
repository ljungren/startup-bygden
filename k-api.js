var request = require('request');
var xml2js = require('xml2js');

var config = require('./config');
 

// request(config.endpoint, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// request.post(config.endpoint).form({'x-api':config.apikey});

var xml = "<xml><records><record>Hello xml2js!</record></records></root>";
xml2js.parseString(xml, function (err, result) {
    console.dir('parse: '+result[0]);
});

// var convert = function(input){
//   var output = '';
//   parseString(input, function (err, result) {
//       console.dir(result);
//       output = result;
//   });
//   return output;
// }

// request
//   .get(config.endpoint)
//   .on('error', function(err) {
//     console.log(err)
//   })
//   .on('response', function(response, body) {
//     console.log(response.statusCode) // 200
//     console.log(response.headers['content-type']) // 'image/png'
//     var jsonObj = convert(body);
//     console.log('body:', jsonObj);
//   });


