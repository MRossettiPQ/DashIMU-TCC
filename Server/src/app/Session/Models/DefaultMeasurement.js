module.exports = (sequelize, Sequelize) => {
  const DefaultMeasurement = sequelize.define('default_measurements', {
    idDefaultMeasurement: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  })

  return DefaultMeasurement
}
