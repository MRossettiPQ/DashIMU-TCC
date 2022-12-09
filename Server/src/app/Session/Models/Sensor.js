module.exports = (sequelize, Sequelize) => {
  const Sensor = sequelize.define('sensors', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sensorName: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.ENUM,
      values: ['ONE', 'TWO'],
    },
    type: {
      type: Sequelize.ENUM,
      values: ['GYROSCOPE', 'HUMIDITY'],
      defaultValue: 'GYROSCOPE',
    },
  })

  Sensor.associate = (models) => {
    Sensor.belongsTo(models.Movement)
    Sensor.hasMany(models.GyroMeasurement, {
      onDelete: 'CASCADE',
    })
    return Sensor
  }

  return Sensor
}
