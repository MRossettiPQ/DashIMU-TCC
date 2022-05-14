module.exports = (sequelize, Sequelize) => {
    return sequelize.define('sessao', {
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
        }
    });
};
