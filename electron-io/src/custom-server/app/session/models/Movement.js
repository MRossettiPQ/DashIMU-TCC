module.exports = function Movement(sequelize, Sequelize) {
  const Movement = sequelize.define('movements', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
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
  Movement.associate = ({ Session, Sensor }) => {
    Movement.belongsTo(Session)
    Movement.hasMany(Sensor, {
      onDelete: 'CASCADE',
    })
    return Movement
  }

  return Movement
}
