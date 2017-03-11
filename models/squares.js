module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Squares", {
    name: DataTypes.STRING
  })
}
