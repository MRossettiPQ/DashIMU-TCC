module.exports = (sequelize, Sequelize) => {
    const Medicao = sequelize.define('Medicao', {
        idMedicao: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

    return Medicao;
}