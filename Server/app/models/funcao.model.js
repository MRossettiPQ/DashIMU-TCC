module.exports = (sequelize, Sequelize) => {
    const Funcao = sequelize.define('funcao', {
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
    return Funcao;
} 