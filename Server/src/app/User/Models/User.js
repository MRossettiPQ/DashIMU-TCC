module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    idUser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM,
      values: ['ADMINISTRATOR', 'PHYSIOTHERAPIST', 'PATIENT'],
      defaultValue: 'PHYSIOTHERAPIST',
    },
  })

  User.associate = (models) => {
    User.belongsToMany(models.Patient, {
      through: 'user_patient',
    })
    User.hasMany(models.Session)
    return User
  }

  return User
}
