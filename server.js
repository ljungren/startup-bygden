// Create a HTTP server on port 8000
// Send plain text headers and 'Hello World' to each client

var db      = require('./models');
const readline = require('readline');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var port = process.env.PORT || 8000;
var utm = require('utm');
const fs = require('fs');


var counter = 0;

db.sequelize.sync().then(function() {
//db.sequelize.sync({force: true}).then(function() {

  /*Set EJS template Engine*/
  app.set('views','./views');
  app.set('view engine','ejs');

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
  app.use(bodyParser.json());

  // index page
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'StartUp-Bygden',
      data: {
        name: "Namn på bostad",
        city: "Umeå",
        description: "Här bodde familjen andersson för miljarder år sen",
        imageURL: "bild.jpg"
      }
    });
  });

  app.get('/importmunicipalities', function(req, res) {

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
  });

  app.get('/seemunicipalities', function(req, res) {
    var data = db.Municipality.findAll().then(function(munic) {
      var data = JSON.stringify(munic)
      res.end(data); // send response and close connection
    })
  });

  app.get('/importsquares', function(req, res) {
    let obj, pop;
    let easting, northing, LatLon, latitude, longitude;

    fs.readFile('./density.json', 'utf8', (err, jsonData) => {
      if (err) throw err;

      obj = JSON.parse(jsonData);

      var size = Object.keys(obj.features).length;

      for (let i = 0; i < size; i++) {
        if(obj.features[i].geometry!=null){
          let pop = parseInt(obj.features[i].properties.Pop);

          let square = db.Squares.build({
            population: pop
          })
          //console.log(obj.features[0].geometry.coordinates);*/

          let coords = obj.features[i].geometry.coordinates[0].length - 1;

          for(let j = 0; j < coords; j++ ){

            easting = obj.features[i].geometry.coordinates[0][j][0];
            northing = obj.features[i].geometry.coordinates[0][j][1];

            LatLon = utm.toLatLon(easting, northing, 33, '', true, true);

            square["c" + (j+1) + "Lat"] = cleanPosition(LatLon.latitude);
            square["c" + (j+1) + "Lon"] = cleanPosition(LatLon.longitude);

            latitude += LatLon.latitude;
            longitude += LatLon.longitude;
          }

          midLat = latitude / coords;
          midLong = longitude / coords;

          square.cMidLat = cleanPosition(LatLon.latitude);
          square.cMidLon = cleanPosition(LatLon.longitude);

          square.save()

          latitude = 0;
          longitude = 0;

        }
      }

    });
  });

  app.listen(port);
  console.log('Server running at http://127.0.0.1:' + port);

});

function cleanInternetConnection(s) {
  return parseFloat(s.replace('%','').replace(' ', '').replace(',','.'));
}

function cleanPosition(p) {
  return parseFloat(p);
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
