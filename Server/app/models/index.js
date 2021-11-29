const dbConfig = require("../config/db.config.js"),
  Sequelize = require("sequelize");
//Conexao MySQL com Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuario = require("../models/user.model.js")(sequelize, Sequelize);
db.funcao = require("../models/funcao.model.js")(sequelize, Sequelize);
db.sessao = require("../models/sessao.model.js")(sequelize, Sequelize);
db.medicao = require("../models/medicao.model.js")(sequelize, Sequelize);
db.paciente = require("../models/paciente.model.js")(sequelize, Sequelize);
//usuario e função
db.funcao.belongsToMany(db.usuario, {
  through: "usuario_funcao",
  foreignKey: "idFuncao",
  otherKey: "idUser",
});
db.usuario.belongsToMany(db.funcao, {
  through: "usuario_funcao",
  foreignKey: "idUser",
  otherKey: "idFuncao",
});
//usuario e paciente
db.paciente.belongsToMany(db.usuario, {
  through: "usuario_paciente",
  foreignKey: "idPaciente",
  otherKey: "idUser",
});
db.usuario.belongsToMany(db.paciente, {
  through: "usuario_paciente",
  foreignKey: "idUser",
  otherKey: "idPaciente",
});
//paciente e sessão
db.sessao.belongsToMany(db.paciente, {
  through: "paciente_sessao",
  foreignKey: "idSessao",
  otherKey: "idPaciente",
});
db.paciente.belongsToMany(db.sessao, {
  through: "paciente_sessao",
  foreignKey: "idPaciente",
  otherKey: "idSessao",
});
//sessão e medição
db.medicao.belongsToMany(db.sessao, {
  through: "sessao_medicao",
  foreignKey: "idMedicao",
  otherKey: "idSessao",
});
db.sessao.belongsToMany(db.medicao, {
  through: "sessao_medicao",
  foreignKey: "idSessao",
  otherKey: "idMedicao",
});

db.FUNCAO = ["USUARIO", "PACIENTE", "ADMIN"];

module.exports = db;
