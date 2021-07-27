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

db.usuario  = require("../models/user.model.js")(sequelize, Sequelize);
db.funcao   = require("../models/funcao.model.js")(sequelize, Sequelize);
db.sessao   = require("../models/sessao.model.js")(sequelize, Sequelize);
db.medicao  = require("../models/medicao.model.js")(sequelize, Sequelize);
//
db.funcao.belongsToMany(db.usuario, {
    through:    "usuario_funcao",
    foreignKey: "idFuncao",
    otherKey:   "idUser"
});
db.usuario.belongsToMany(db.funcao, {
    through:    "usuario_funcao",
    foreignKey: "idUser",
    otherKey:   "idFuncao"
});
//
db.sessao.belongsToMany(db.usuario, {
    through:    "usuario_sessao",
    foreignKey: "idSessao",
    otherKey:   "idUser"
});
db.usuario.belongsToMany(db.sessao, {
    through:    "usuario_sessao",
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

db.FUNCAO = ["USUARIO", "PACIENTE", "ADMIN"];

module.exports = db;