module.exports = function Procedure(sequelize, Sequelize) {
  const Procedure = sequelize.define('procedures', {
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
  Procedure.associate = ({ Session, Movement }) => {
    // O procedimento possui apenas uma sessão
    Procedure.belongsTo(Session)
    // Movement.belongsTo(Session)
    // Todos procedimentos podem ter varios movimentos
    Procedure.hasMany(Movement, {
      onDelete: 'CASCADE',
    })
    return Procedure
  }

  return Procedure
}
