const {enviroment} = require('../../enviroment.js');
const {Sequelize} = require('sequelize');

//Conexao MySQL com Sequelize
const sequelize = new Sequelize(
    enviroment.DATABASE.NAME,
    enviroment.DATABASE.USER,
    enviroment.DATABASE.PASSWORD,
    {
        host: enviroment.DATABASE.HOST,
        port: enviroment.DATABASE.PORT,
        dialect: enviroment.DATABASE.DIALECT,
        logging: enviroment.DATABASE.LOGGING,
        pool: {
            max: enviroment.DATABASE.POOL.MAX,
            min: enviroment.DATABASE.POOL.MIN,
            acquire: enviroment.DATABASE.POOL.ACQUIRE,
            idle: enviroment.DATABASE.POOL.IDLE,
        },
    }
);
const DataBaseOperator = {};

DataBaseOperator.Sequelize = Sequelize;
DataBaseOperator.sequelize = sequelize;

DataBaseOperator.usuario = require('../models/usuario.model.js')(sequelize, Sequelize);
DataBaseOperator.funcao = require('../models/funcao.model.js')(sequelize, Sequelize);
DataBaseOperator.sessao = require('../models/sessao.model.js')(sequelize, Sequelize);
DataBaseOperator.medicao = require('../models/medicao.model.js')(sequelize, Sequelize);
DataBaseOperator.paciente = require('../models/paciente.model.js')(sequelize, Sequelize);
//usuario e função
DataBaseOperator.funcao.belongsToMany(DataBaseOperator.usuario, {
    through: 'usuario_funcao',
    foreignKey: 'idFuncao',
    otherKey: 'idUsuario',
});
DataBaseOperator.usuario.belongsToMany(DataBaseOperator.funcao, {
    through: 'usuario_funcao',
    foreignKey: 'idUsuario',
    otherKey: 'idFuncao',
});
//usuario e paciente
DataBaseOperator.paciente.belongsToMany(DataBaseOperator.usuario, {
    through: 'usuario_paciente',
    foreignKey: 'idPaciente',
    otherKey: 'idUsuario',
});
DataBaseOperator.usuario.belongsToMany(DataBaseOperator.paciente, {
    through: 'usuario_paciente',
    foreignKey: 'idUsuario',
    otherKey: 'idPaciente',
});
//paciente e sessão
DataBaseOperator.sessao.belongsToMany(DataBaseOperator.paciente, {
    through: 'paciente_sessao',
    foreignKey: 'idSessao',
    otherKey: 'idPaciente',
});
DataBaseOperator.paciente.belongsToMany(DataBaseOperator.sessao, {
    through: 'paciente_sessao',
    foreignKey: 'idPaciente',
    otherKey: 'idSessao',
});
//sessão e medição
DataBaseOperator.medicao.belongsToMany(DataBaseOperator.sessao, {
    through: 'sessao_medicao',
    foreignKey: 'idMedicao',
    otherKey: 'idSessao',
});
DataBaseOperator.sessao.belongsToMany(DataBaseOperator.medicao, {
    through: 'sessao_medicao',
    foreignKey: 'idSessao',
    otherKey: 'idMedicao',
});

DataBaseOperator.FUNCAO = ['FISIO', 'ADMIN'];

module.exports = DataBaseOperator;
