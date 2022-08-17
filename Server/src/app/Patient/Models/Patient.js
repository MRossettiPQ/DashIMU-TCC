module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define('patient', {
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
      type: Sequelize.STRING,
      allowNull: true,
    },
  })

  Patient.associate = (models) => {
    Patient.hasMany(models.Session)
    Patient.belongsToMany(models.User, {
      through: 'user_patient',
    })
    return Patient
  }

  return Patient
}
