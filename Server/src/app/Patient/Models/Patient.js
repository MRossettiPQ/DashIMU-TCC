module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define('Patients', {
    idPatient: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    stature: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
  })

  Patient.associate = (models) => {
    Patient.hasMany(models.Session, {
      as: 'Patient',
      foreignKey: 'idSession',
      constraints: false,
      onDelete: 'CASCADE',
    })
    return Patient
  }

  return Patient
}
