function resolveEnvironment() {
  // let mergeEnv = require(`./env.${env}.json`);

  // TODO abaixo configuração de desenvolvimento
  return {
    development: true,
    just_api: false,
    secret: "dash-imu-secret-key",
    electron: {
      url: "http://localhost",
    },
    host: {
      port: 8000,
      port_socket: 8001,
      cors: {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
        origin: "*",
        methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT"],
      },
    },
    database: {
      dialect: "sqlite",
      sequelize: {
        maria_mysql: {
          database: "dash_imu",
          username: "root",
          password: "1",
          host: "127.0.0.1",
          port: 3306,
          dialect: "mysql",
          benchmark: true,
          pool: {
            max: 5,
            min: 0,
            acquire: 900000,
            idle: 100000,
          },
        },
        sqlite: {
          storage: "../../../../cache/dash_imu.sqlite", // TODO cria uma pasta 'cache' na raiz do projeto contendo o banco
          dialect: "sqlite",
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
      format: "[CLOG] - :date[clf] - [MORGAN] - [:method] - :url :status :res[content-length] - :response-time ms",
    },
    // ...mergeEnv,
  };
}

const environment = resolveEnvironment();
module.exports = environment;
