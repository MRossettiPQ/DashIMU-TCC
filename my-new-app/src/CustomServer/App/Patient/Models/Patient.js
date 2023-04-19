module.exports = function Patient(sequelize, Sequelize) {
  const Patient = sequelize.define('patients', {
    id: {
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
      onDelete: 'CASCADE',
    })
    return Patient
  }

  return Patient
}
