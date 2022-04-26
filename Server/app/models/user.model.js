module.exports = (sequelize, Sequelize) => {
  return sequelize.define("users", {
    idUser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usernameUser: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nomeUser: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    emailUser: {
      type: Sequelize.STRING,
      allowNull: false
    },
    telefoneUser: {
      type: Sequelize.STRING,
      allowNull: true
    },
    senhaUser: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nascUser: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });
};
