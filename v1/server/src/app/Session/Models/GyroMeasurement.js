module.exports = function GyroMeasurement(sequelize, Sequelize) {
  const GyroMeasurement = sequelize.define('gyro_measurements', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sensorName: {
      type: Sequelize.STRING,
    },
    numberMensuration: {
      type: Sequelize.INTEGER,
    },
    hourMensuration: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    Acc_X: {
      type: Sequelize.DECIMAL,
    },
    Acc_Y: {
      type: Sequelize.DECIMAL,
    },
    Acc_Z: {
      type: Sequelize.DECIMAL,
    },
    AccelX_mss: {
      type: Sequelize.DECIMAL,
    },
    AccelY_mss: {
      type: Sequelize.DECIMAL,
    },
    AccelZ_mss: {
      type: Sequelize.DECIMAL,
    },
    Gyr_X: {
      type: Sequelize.DECIMAL,
    },
    Gyr_Y: {
      type: Sequelize.DECIMAL,
    },
    Gyr_Z: {
      type: Sequelize.DECIMAL,
    },
    Mag_X: {
      type: Sequelize.DECIMAL,
    },
    Mag_Y: {
      type: Sequelize.DECIMAL,
    },
    Mag_Z: {
      type: Sequelize.DECIMAL,
    },
    Roll: {
      type: Sequelize.DECIMAL,
    },
    Pitch: {
      type: Sequelize.DECIMAL,
    },
    Yaw: {
      type: Sequelize.DECIMAL,
    },
    /*
    TODO descomentar depois de fazer backup, colunas faltando no banco
    Euler_X: {
      type: Sequelize.DECIMAL,
    },
    Euler_Y: {
      type: Sequelize.DECIMAL,
    },
    Euler_Z: {
      type: Sequelize.DECIMAL,
    },
    Quaternion_X: {
      type: Sequelize.DECIMAL,
    },
    Quaternion_Y: {
      type: Sequelize.DECIMAL,
    },
    Quaternion_Z: {
      type: Sequelize.DECIMAL,
    },
    Quaternion_W: {
      type: Sequelize.DECIMAL,
    }, */
  })

  GyroMeasurement.associate = (models) => {
    GyroMeasurement.belongsTo(models.Sensor)
    return GyroMeasurement
  }

  return GyroMeasurement
}
