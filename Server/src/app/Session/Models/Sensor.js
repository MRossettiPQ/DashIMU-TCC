module.exports = (sequelize, Sequelize) => {
  const Sensor = sequelize.define('sensors', {
    idGyroSensor: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sensorName: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.ENUM,
      values: ['GYROSCOPE', 'HUMIDITY'],
      defaultValue: 'GYROSCOPE',
    },
  })

  Sensor.associate = (models) => {
    Sensor.hasMany(models.GyroMeasurement, {
      onDelete: 'CASCADE',
    })
    Sensor.belongsTo(models.Session)
    return Sensor
  }

  return Sensor
}
