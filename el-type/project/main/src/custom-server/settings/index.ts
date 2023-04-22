import type { Dialect, Options } from 'sequelize';

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
  electron: ElectronConfig;
  secret: string;
  host: ServerConfig;
  swagger: SwaggerConfig;
  morgan: MorganConfig;
  database: DBConfig;
}

const settings: Environment = {
  env: 'development',
  productName: 'Dash IMU',
  development: true,
  just_api: false,
  secret: 'dash-imu-secret-key',
  electron: {
    url: 'http://localhost',
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
        benchmark: true,
        pool: {
          max: 5,
          min: 0,
          acquire: 900000,
          idle: 100000,
        },
      },
      sqlite: {
        storage: './cache/dash_imu.sqlite',
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
    format:
      '[CLOG] - :date[clf] - [MORGAN] - [:method] - :url :status :res[content-length] - :response-time ms',
  },
};

export { settings };
