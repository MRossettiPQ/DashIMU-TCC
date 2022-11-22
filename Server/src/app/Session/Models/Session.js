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
    movement: {
      type: Sequelize.ENUM,
      values: [
        'FLEXION',
        'EXTENSION',
        'ADDUCTION',
        'ABDUCTION',
        'INTERNAL_ROTATION',
        'EXTERNAL_ROTATION',
        'PRONATION',
        'SUPINATION',
        'THUMB_INTERNAL_FLEXION',
        'THUMB_INTERNAL_EXTENSION',
        'INTERNAL_EXTENSION_FINGERS',
        'ULNAR_ADDUCTION',
        'RADIAL_ADDUCTION',
      ],
    },
  })

  Session.associate = (models) => {
    Session.hasMany(models.Sensor, {
      onDelete: 'CASCADE',
    })
    Session.belongsTo(models.Patient)
    Session.belongsTo(models.User)
    return Session
  }

  return Session
}
