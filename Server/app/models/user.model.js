module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('Users', {
        idUser: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomeUser: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        usernameUser: {
            type: Sequelize.STRING,
            allowNull: false
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
    return User;
} 