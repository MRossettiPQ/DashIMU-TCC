module.exports = (sequelize, Sequelize) => {
  const GyroSensor = sequelize.define('gyro_sensors', {
    idGyroSensor: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sensorName: {
      type: Sequelize.STRING,
    },
  })

  GyroSensor.associate = (models) => {
    GyroSensor.hasMany(models.Measurement, {
      onDelete: 'CASCADE',
    })
    GyroSensor.belongsTo(models.Session)
    return GyroSensor
  }

  return GyroSensor
}
