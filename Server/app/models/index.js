const   dbConfig    = require("../config/db.config.js"),
        Sequelize   = require('sequelize');
//Conexao MySQL com Sequelize
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        logging: dbConfig.logging,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user     = require("../models/user.model.js")(sequelize, Sequelize);
db.role     = require("../models/role.model.js")(sequelize, Sequelize);
db.sessao   = require("../models/sessao.model.js")(sequelize, Sequelize);
db.medicao  = require("../models/medicao.model.js")(sequelize, Sequelize);
//
db.role.belongsToMany(db.user, {
    through:    "user_roles",
    foreignKey: "idRole",
    otherKey:   "idUser"
});
db.user.belongsToMany(db.role, {
    through:    "user_roles",
    foreignKey: "idUser",
    otherKey:   "idRole"
});
//
db.sessao.belongsToMany(db.user, {
    through:    "user_sessao",
    foreignKey: "idSessao",
    otherKey:   "idUser"
});
db.user.belongsToMany(db.sessao, {
    through:    "user_sessao",
    foreignKey: "idUser",
    otherKey:   "idSessao"
});
//
db.medicao.belongsToMany(db.sessao, {
    through:    "medicao_sessao",
    foreignKey: "idMedicao",
    otherKey:   "idSessao"
});
db.sessao.belongsToMany(db.medicao, {
    through:    "medicao_sessao",
    foreignKey: "idSessao",
    otherKey:   "idMedicao"
});

db.ROLES = ["USUARIO", "PACIENTE", "ADMIN", "MODERADOR"];

module.exports = db;