var settings = require('./../config/settings.js')

var pg = require('pg');
pg.defaults.ssl = true;

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.DATABASE_URL) {
    console.log("HEROKU DB")
    var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      dialectOption: {
        ssl: true
      },
      port:     match[4],
      host:     match[3],
      logging:  false //false
    })
  } else {
    // the application is executed on the local machine ... use mysql
    console.log("LOCAL DB")
    sequelize = new Sequelize(
      settings.database.url,
      {
        dialect:  'postgres',
        protocol: 'postgres',
        dialectOption: {
          ssl: true
        },
        port:     settings.database.port,
        host:     settings.database.host,
        logging:  false //false
      }
    )
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Municipality:      sequelize.import(__dirname + '/municipality')
    // add your other models here
  }

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db
