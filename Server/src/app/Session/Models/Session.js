module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define('sessions', {
    idSession: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    weight: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
  })

  Session.associate = (models) => {
    Session.hasMany(models.Measurement, {
      onDelete: 'CASCADE',
      as: 'Measurement',
    })
    Session.belongsTo(models.Patient)
    Session.belongsTo(models.User)
    return Session
  }

  return Session
}
