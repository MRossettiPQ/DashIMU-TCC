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
    procedure: {
      type: Sequelize.ENUM,
      values: ['SHOULDER', 'ELBOW', 'RADIOULNAR', 'WRIST', 'CARPOMETACARPAL_THUMB', 'METACARPOPHALANGEAL', 'PROXIMAL_INTERPHALANGEAL', 'DISTAL_INTERPHALANGEAL'],
    },
    // observation: {
    //   type: Sequelize.STRING,
    // },
  })

  Session.associate = ({ Movement, Patient, User }) => {
    Session.hasMany(Movement, {
      onDelete: 'CASCADE',
    })
    Session.belongsTo(Patient)
    Session.belongsTo(User)
    return Session
  }

  return Session
}
