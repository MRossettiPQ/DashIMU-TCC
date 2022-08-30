module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define('Sessions', {
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
    Session.hasMany(models.Mensuration, {
      foreignKey: 'idSession',
      constraints: false,
      onDelete: 'CASCADE',
    })
    Session.belongsTo(models.Patient, {
      as: 'Patient',
      foreignKey: 'idPatient',
    })
    Session.belongsTo(models.User, {
      as: 'Monitor',
      foreignKey: 'idUser',
    })
    return Session
  }

  return Session
}
