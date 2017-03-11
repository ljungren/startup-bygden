module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Municipality", {
    name: DataTypes.STRING,
    internet1: DataTypes.FLOAT,
    internet3: DataTypes.FLOAT,
    internet10: DataTypes.FLOAT,
    internet30: DataTypes.FLOAT,
    internet100: DataTypes.FLOAT
  })
}
