const enviroment = require('../../../enviroment.js');
const {Sequelize} = require('sequelize');
const UsuarioModel = require('../../Usuario/Models/Usuario.js')
const FuncaoModel = require('../../Usuario/Models/Funcao.js')
const SessaoModel = require('../../Sessao/Models/Sessao.js')
const MedicaoModel = require('../../Sessao/Models/Medicao.js')
const PacienteModel = require('../../Paciente/Models/Paciente.js')

//Conexão com Banco usando Sequelize
//TODO configurar via enviroment
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

DataBaseOperator.usuario = UsuarioModel(sequelize, Sequelize);
DataBaseOperator.funcao = FuncaoModel(sequelize, Sequelize);
DataBaseOperator.sessao = SessaoModel(sequelize, Sequelize);
DataBaseOperator.medicao = MedicaoModel(sequelize, Sequelize);
DataBaseOperator.paciente = PacienteModel(sequelize, Sequelize);
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

DataBaseOperator.FuncaoEnum = ['FISIO', 'ADMIN'];

module.exports = DataBaseOperator;
