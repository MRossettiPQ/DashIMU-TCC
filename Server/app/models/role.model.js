module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('Role', {
        idRole: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomeRole: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
    return Role;
} 