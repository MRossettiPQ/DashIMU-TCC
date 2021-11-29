module.exports = (sequelize, Sequelize) => {
  const Medicao = sequelize.define("medicao", {
    idMedicao: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return Medicao;
};