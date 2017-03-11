var request = require('request');
var parseString = require('xml2js').parseString;
var config = require('./api-config');

// request(config.endpoint, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// request.post(config.endpoint).form({'x-api':config.apikey});

var convert = function(input){
  var output = '';
  parseString(input, function (err, result) {
    output = result;
  });
  return output;
}

// module.exports = {
//   search: function(element){

var search = function(element){

    // Get search string from client

    // Search in DB within some radius

    // Get Resulting municipality
    var municipality = 'Täby';

    // (insert municipality param)
    var parameterString = '?x-api=hfswe&method=search&query=municipalityName%3D%22' + municipality + '%22+and+itemSpecification=%22*3%20kap*%22'

    request(config.samsokApi.endpoint.concat(parameterString), function (error, response, body) {
      console.log(response.headers['content-type']);
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode); 
      var jsonObj = convert(body);
      var str = JSON.stringify(convert(body), null, 2);

      console.log(str);

      for (var key in str) {
      // skip loop if the property is from prototype
        if (!str.hasOwnProperty(key)) continue;

        var obj = str[key];
        for (var prop in obj) {
            // skip loop if the property is from prototype
            if(!obj.hasOwnProperty(prop)) continue;

            
            // your code
            console.log(prop + " = " + obj[prop]);
        }
      }
      
    });

  // }
}

search();



