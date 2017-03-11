module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Squares", {
    population: DataTypes.INTEGER,
    c1Lat: DataTypes.STRING,
    c1Lon: DataTypes.STRING,
    c2Lat: DataTypes.STRING,
    c2Lon: DataTypes.STRING, 
    c3Lat: DataTypes.STRING,
    c3Lon: DataTypes.STRING, 
    c4Lat: DataTypes.STRING,
    c4Lon: DataTypes.STRING,
    cMidLat: DataTypes.STRING,
    cMidLon: DataTypes.STRING
  })
}
