module.exports = (sequelize, Sequelize) => {
    return sequelize.define('usuario', {
        idUsuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usernameUsuario: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        nomeUsuario: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        emailUsuario: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefoneUsuario: {
            type: Sequelize.STRING,
            allowNull: true
        },
        senhaUsuario: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};
