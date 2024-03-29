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
    observation: {
      type: Sequelize.STRING,
    },
  })
  Movement.associate = ({ Procedure, Sensor }) => {
    // O movimento possui um procedimento
    Movement.belongsTo(Procedure)
    // Os movimentos podem possuir varios sensores e esses as medições
    Movement.hasMany(Sensor, {
      onDelete: 'CASCADE',
    })
    return Movement
  }

  return Movement
}
