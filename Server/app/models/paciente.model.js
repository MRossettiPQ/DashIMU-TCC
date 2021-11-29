module.exports = (sequelize, Sequelize) => {
    const Paciente = sequelize.define('paciente', {
        idPaciente: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomePaciente: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cpfPaciente: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        emailPaciente: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefonePaciente: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nascPaciente: {
            type: Sequelize.DATE,
            allowNull: true
        },
        alturaPaciente: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Paciente;
} 