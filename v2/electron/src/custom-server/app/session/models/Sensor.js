module.exports = function Sensor(sequelize, Sequelize) {
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

  Sensor.associate = ({ Movement, GyroMeasurement }) => {
    // Cada sensor deve ter um movimento
    Sensor.belongsTo(Movement)
    // Todos sensores podem ter varias medições
    Sensor.hasMany(GyroMeasurement, {
      onDelete: 'CASCADE',
    })
    return Sensor
  }

  return Sensor
}
