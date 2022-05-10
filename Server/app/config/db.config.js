serverConfig = require('./server.config.js');
module.exports = {
    HOST: '127.0.0.1',
    PORT: '3306',
    USER: 'root',
    PASSWORD: '1',
    DB: 'database_dashimu',
    dialect: 'mysql', //mariadb
    logging: serverConfig.INDEV,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};