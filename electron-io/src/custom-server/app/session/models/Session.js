module.exports = function Session(sequelize, Sequelize) {
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
    observation: {
      type: Sequelize.STRING,
    },
    // procedure: {
    //   type: Sequelize.ENUM,
    //   values: ['SHOULDER', 'ELBOW', 'RADIOULNAR', 'WRIST', 'CARPOMETACARPAL_THUMB', 'METACARPOPHALANGEAL', 'PROXIMAL_INTERPHALANGEAL', 'DISTAL_INTERPHALANGEAL'],
    // },
  })

  Session.associate = ({ Patient, User, Procedure }) => {
    // TODO: removido com a nova logica de sessão (era assim na v1), agora uma sessão pode ter varios procedimentos, e o procedimento varios movimentos.
    // TODO: em ultimo caso, se necessario usar o front da v1. enviar sessão com 1 array de 1 posição
    // Session.hasMany(Movement, {
    //   onDelete: 'CASCADE',
    // })
    //  Toda sessão pode ter varios movimentos
    Session.hasMany(Procedure, {
      onDelete: 'CASCADE',
    })
    // Toda sessão tem um paciente e um usuario que a criou
    Session.belongsTo(Patient)
    Session.belongsTo(User)
    return Session
  }

  return Session
}
