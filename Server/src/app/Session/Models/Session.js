module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define('session', {
    idSession: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    weight: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
  })

  Session.associate = (models) => {
    Session.hasMany(models.Mensuration)
    Session.belongsTo(models.Patient)
    Session.hasOne(models.User)
    return Session
  }

  return Session
}
