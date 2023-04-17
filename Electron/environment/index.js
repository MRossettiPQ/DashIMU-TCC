const yargs = require('yargs').alias('NODE_ENV', 'NODE_ENV').alias('SEQUELIZE_DIALECT', 'SEQUELIZE_DIALECT').alias('JWT_SECRET', 'JWT_SECRET').alias('STORAGE_SRC', 'STORAGE_SRC').argv
// const env = yargs?.NODE_ENV || 'development'
// const secret = yargs?.JWT_SECRET || null
// const dialect = yargs?.SEQUELIZE_DIALECT || null
// const storageSrc = yargs?.STORAGE_SRC || null
const env = process.env?.NODE_ENV ? process.env.NODE_ENV : 'development'
const dialect = process.env?.SEQUELIZE_DIALECT ? process.env.SEQUELIZE_DIALECT : null
const secret = process.env?.JWT_SECRET ? process.env.JWT_SECRET : null
const storageSrc = process.env?.STORAGE_SRC ? process.env.STORAGE_SRC : null
console.log(env, secret, dialect, storageSrc)
const resolveEnvironment = () => {
  let mergeEnv = require(`./env.${env}.json`)

  if (mergeEnv) {
    if (dialect) {
      // DIALECT ENV
      mergeEnv.database.dialect = dialect
    }
    if (secret) {
      // JWT SECRET ENV
      mergeEnv.secret = secret
    }
    if (storageSrc) {
      // JWT SECRET ENV
      mergeEnv.database.sequelize.sqlite.storage = storageSrc
    }
  }
  return {
    development: true,
    just_api: false,
    secret: 'dash-imu-secret-key',
    electron: {
      url: 'http://localhost:8000/',
    },
    host: {
      port: 8000,
      port_socket: 8001,
      cors: {
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        origin: '*',
        methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'],
      },
    },
    database: {
      dialect: 'sqlite',
      sequelize: {
        maria_mysql: {
          database: 'dash_imu',
          username: 'root',
          password: '1',
          host: '127.0.0.1',
          port: 3306,
          dialect: 'mysql',
          benchmark: true,
          pool: {
            max: 5,
            min: 0,
            acquire: 900000,
            idle: 100000,
          },
        },
        sqlite: {
          storage: 'dash_imu',
          dialect: 'sqlite',
          benchmark: true,
          pool: {
            max: 5,
            min: 0,
            acquire: 900000,
            idle: 100000,
          },
        },
      },
      syncOptions: {
        wipe_on_start: true,
        alter: false,
      },
    },
    swagger: {
      options: {
        explorer: true,
      },
    },
    morgan: {
      format: '[CLOG] - :date[clf] - [MORGAN] - [:method] - :url :status :res[content-length] - :response-time ms',
    },
    ...mergeEnv,
  }
}

module.exports = resolveEnvironment()