module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define('sessions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    type: {
      type: Sequelize.ENUM,
      values: ['EXAMPLE', 'REAL'],
      defaultValue: 'REAL',
    },
    procedure: {
      type: Sequelize.ENUM,
      values: [
        'SHOULDER',
        'ELBOW',
        'RADIOULNAR',
        'WRIST',
        'CARPOMETACARPAL_THUMB',
        'METACARPOPHALANGEAL',
        'PROXIMAL_INTERPHALANGEAL',
        'DISTAL_INTERPHALANGEAL',
      ],
    },
  })

  Session.associate = (models) => {
    Session.hasMany(models.Movement, {
      onDelete: 'CASCADE',
    })
    Session.belongsTo(models.Patient)
    Session.belongsTo(models.User)
    return Session
  }

  return Session
}
