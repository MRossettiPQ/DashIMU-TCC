import { Options, Dialect } from "sequelize";
// import { merge } from "lodash";
// import { resolve, dirname, join } from "path";

const env = process.env?.NODE_ENV ? process.env.NODE_ENV : "development";
const dialect = process.env?.SEQUELIZE_DIALECT ? process.env.SEQUELIZE_DIALECT : null;
const secret = process.env?.JWT_SECRET ? process.env.JWT_SECRET : null;
const storageSrc = process.env?.STORAGE_SRC ? process.env.STORAGE_SRC : null;

interface CorsConfig {
  allowedHeaders: string[];
  methods: string[];
  origin: string;
}

interface ServerConfig {
  port: number;
  port_socket: number;
  cors: CorsConfig;
}

interface SwaggerOptions {
  explorer: boolean;
}

interface SwaggerConfig {
  options: SwaggerOptions;
}

interface MorganConfig {
  format: string;
}

interface SyncOptions {
  wipe_on_start: boolean;
  alter: boolean;
}

interface DBType {
  sqlite: Options;
  maria_mysql: Options;
}

interface DBConfig {
  dialect: Dialect;
  sequelize: DBType;
  syncOptions: SyncOptions;
}

interface ElectronConfig {
  url: string;
}

interface Environment {
  env: string;
  productName: string;
  development: boolean;
  just_api: boolean;
  secret: string;
  electron: ElectronConfig;
  host: ServerConfig;
  swagger: SwaggerConfig;
  morgan: MorganConfig;
  database: DBConfig;
}

function resolveEnvironment(): Environment {
  // const path = resolve(__dirname, `./electron/environment/env.${env}.json`);
  // console.log(path);
  // const mergeEnv: Environment = require(path);
  const mergeEnv = {};
  if (mergeEnv) {
    if (dialect) {
      // DIALECT ENV
      // mergeEnv.database.dialect = <Dialect>dialect;
    }
    if (secret) {
      // JWT SECRET ENV
      // mergeEnv.secret = secret;
    }
    if (storageSrc) {
      // JWT SECRET ENV
      // mergeEnv.database.sequelize.sqlite.storage = storageSrc;
    }
  }

  return {
    env: "development",
    productName: "Dash IMU",
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
          storage: "dash_imu",
          // dialect: "sqlite",
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
  };
}

const environment = resolveEnvironment();

export { environment, environment as default, env };
