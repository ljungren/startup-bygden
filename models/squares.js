module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Squares", {
    population: DataTypes.INTEGER,
    c1Lat: DataTypes.FLOAT,
    c1Lon: DataTypes.FLOAT,
    c2Lat: DataTypes.FLOAT,
    c2Lon: DataTypes.FLOAT,
    c3Lat: DataTypes.FLOAT,
    c3Lon: DataTypes.FLOAT,
    c4Lat: DataTypes.FLOAT,
    c4Lon: DataTypes.FLOAT,
    cMidLat: DataTypes.FLOAT,
    cMidLon: DataTypes.FLOAT,
    municipality: DataTypes.STRING
  })
}
