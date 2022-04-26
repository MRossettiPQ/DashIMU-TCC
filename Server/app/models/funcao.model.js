module.exports = (sequelize, Sequelize) => {
  return sequelize.define("funcao", {
    idFuncao: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nomeFuncao: {
      type: Sequelize.STRING,
      unique: true
    }
  });
};
