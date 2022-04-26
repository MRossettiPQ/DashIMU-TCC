module.exports = (sequelize, Sequelize) => {
  return sequelize.define("medicao", {
    idMedicao: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
};
