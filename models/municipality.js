module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Municipality", {
    name: DataTypes.STRING
  })
}
