// Create a HTTP server on port 8000
// Send plain text headers and 'Hello World' to each client

var db      = require('./models');
const readline = require('readline');

var http = require('http');
var port = process.env.PORT || 8000;
var utm = require('utm');
const fs = require('fs');


var counter = 0;

db.sequelize.sync().then(function() {
//db.sequelize.sync({force: true}).then(function() {
  http.createServer(function (req, res) {

  	// increment the counter for each visitor request

    var path = req.url;
    console.log("requested=" + path + " counter=" + counter);

    res.writeHead(200, {'Content-Type': 'text/html'}); // prepare response headers

    if (path == "/") {
    	res.end("Welcome to startup-bygden! Find your startup spot in bygden!");

    } else if (path == "/importmunicipalities") {

      var rd = readline.createInterface({
        input: fs.createReadStream('./data/internet.csv'),
        output: process.stdout,
        console: false
      });

      rd.on('line', function(line) {
          let cols = line.split(';')

          let municipality = db.Municipality.build({
            name: cols[0],
            internet1: cleanInternetConnection(cols[27]),
            internet3: cleanInternetConnection(cols[41]),
            internet10: cleanInternetConnection(cols[55]),
            internet30: cleanInternetConnection(cols[61]),
            internet100: cleanInternetConnection(cols[75])
          })

          //municipality.save()
      });

    } else if (path == "/seemunicipalities") {
      var data = db.Municipality.findAll().then(function(munic) {
        var data = JSON.stringify(munic)
        res.end(data); // send response and close connection
      })
    } else if (path == "/importsquares") {

        let obj, pop;
        let easting, northing, LatLon, latitude, longitude;

        fs.readFile('./density.json', 'utf8', (err, jsonData) => {
          if (err) throw err;

          obj = JSON.parse(jsonData);

          var size = Object.keys(obj.features).length;

          for (let i = 0; i < size; i++) {
            if(obj.features[i].geometry!=null){
              let pop = parseInt(obj.features[i].properties.Pop);

              console.log(pop);
              //console.log(obj.features[0].geometry.coordinates);*/

              let coords = obj.features[i].geometry.coordinates[0].length - 1;

              for(let j = 0; j < coords; j++ ){

                easting = obj.features[i].geometry.coordinates[0][j][0];
                northing = obj.features[i].geometry.coordinates[0][j][1];

                //console.log(easting + " " + northing);
                LatLon = utm.toLatLon(easting, northing, 33, '', true, true);

                latitude += LatLon.latitude;
                longitude += LatLon.longitude;
              }

              midLat = latitude / coords;
              midLong = longitude / coords;

              latitude = 0;
              longitude = 0;

            }
          }

        });


    }

  }).listen(port);
});

function cleanInternetConnection(s) {
  return parseFloat(s.replace('%','').replace(' ', '').replace(',','.'));
}

function latLonToMunicipality (lat, lon) {
  http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=" + settings.maps.apikey, (res) => {
    const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error(`Request Failed.\n` +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(`Invalid content-type.\n` +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.log(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      try {
        let parsedData = JSON.parse(rawData);
        console.log(parsedData);
        return "";
      } catch (e) {
        console.log(e.message);
        return "";
      }
    });
  })
}

// console info message
console.log('Server running at http://127.0.0.1:' + port);
