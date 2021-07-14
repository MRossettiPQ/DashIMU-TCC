const dbConfig = require("../../config/dbConfig.js");

const   Sequelize = require('sequelize');
//Conexao MySQL com Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate().then(function(){
    console.log('Conexão realizada com sucesso com o BD');
}).catch(function(err){
    console.log('Erro na conexão realizada com o BD');
});

const Users = sequelize.define('Users', {
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
    userUser: {
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
    }
});

const Paciente = sequelize.define('Paciente', {
    idPaciente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomePaciente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailPaciente: {
        type: Sequelize.STRING,
        allowNull: true
    },
    telefonePaciente: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nascPaciente: {
        type: Sequelize.DATE,
        allowNull: true
    }
});
const Sessao = sequelize.define('Sessao', {
    idSessao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dataSessao: {
        type: Sequelize.DATE,
        allowNull: true
    },
    pesoSessao: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
});

const Medicao = sequelize.define('Medicao', {
    idMedicao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

Users.sync({force: false});                         //Cria tabela no BD caso esse esteja vazio

Users.hasMany(Paciente);                            //Adicionar chave estrangeira a tabela de Pacientes
Paciente.sync({force: false});                      //Cria tabela no BD caso esse esteja vazio

Paciente.hasMany(Sessao);                           //Adicionar chave estrangeira a tabela de Sessao
Sessao.sync({force: false});                        //Cria tabela no BD caso esse esteja vazio

Sessao.hasMany(Medicao);                            //Adicionar chave estrangeira a tabela de Medição
Medicao.sync({force: false});                       //Cria tabela no BD caso esse esteja vazio

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;