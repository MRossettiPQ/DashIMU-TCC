module.exports = (sequelize, Sequelize) => {
  const Mensuration = sequelize.define('mensuration', {
    idMensuration: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idSensor: {
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
  })

  Mensuration.associate = (models) => {
    Mensuration.belongsTo(models.Session)
    return Mensuration
  }

  return Mensuration
}
