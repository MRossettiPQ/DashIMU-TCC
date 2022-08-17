const { Sequelize } = require('sequelize')
const mysql = require('mysql2')
const User = require('../../app/User/Models/User.js')
const Session = require('../../app/Session/Models/Session.js')
const Mensuration = require('../../app/Session/Models/Mensuration.js')
const Patient = require('../../app/Patient/Models/Patient.js')
const environment = require('../../../environment')

const pool = mysql.createPool({
  host: environment.database.host,
  port: environment.database.port,
  user: environment.database.user,
  password: environment.database.password,
})
pool.query(`CREATE DATABASE IF NOT EXISTS \`${environment.database.name}\`;`)

// TODO Database connection using Sequelize - configure via environment
const sequelize = new Sequelize(
  environment.database.name,
  environment.database.user,
  environment.database.password,
  {
    host: environment.database.host,
    port: environment.database.port,
    dialect: environment.database.dialect,
    logging: environment.database.logging,
    pool: {
      max: environment.database.pool.max,
      min: environment.database.pool.min,
      acquire: environment.database.pool.acquire,
      idle: environment.database.pool.idle,
    },
  }
)
/*
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  fs.readdirSync(modelsDir)
    .filter(function(file) {
      return !file.endsWith('index.js') && file.match(/\.js/);
    })
    .forEach(function(file) {
      sequelize.import(path.join(modelsDir, file));
    });
  var models = sequelize.models;

*/

const initDataBase = async () => {
  try {
    // TODO - { force : false } option to drop the data from the database -> if true it will delete the entire database at each startup
    await sequelize.sync({ force: environment.database.wipe_on_start })
    // console.log(sequelize)
    console.log('[DATABASE] - Drop or Rsync Database')
  } catch (e) {
    console.log('[DATABASE] - Error in Drop or Rsync Database')
  }
}

// Declare all models in project
const models = {
  User: User(sequelize, Sequelize),
  Session: Session(sequelize, Sequelize),
  Mensuration: Mensuration(sequelize, Sequelize),
  Patient: Patient(sequelize, Sequelize),
}

// Find all associations, Model by Model
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

module.exports = {
  initDataBase,
  Sequelize,
  sequelize,
  ...models,
}
