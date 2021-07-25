module.exports = (sequelize, Sequelize) => {
    const Sessao = sequelize.define('Sessao', {
        idSessao: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dataSessao: {
            type: Sequelize.DATE,
            allowNull: true
        },
        pesoSessao: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
    });
    return Sessao;
}