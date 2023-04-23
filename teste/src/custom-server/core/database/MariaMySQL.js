const { settings } = require('../../settings')
const mysql = require('mysql2')
const { logColor } = require('../utils/LogUtil')

class MariaMySQL {
  async createDatabase(pool) {
    const sql = `CREATE DATABASE IF NOT EXISTS ${settings.database.sequelize.maria_mysql.database};`
    return await this.asyncQuerySQL(pool, sql)
  }

  async checkDatabaseIfExists(pool) {
    const sql = `SHOW DATABASES LIKE "${settings.settings.sequelize.maria_mysql.database}"`
    return await this.asyncQuerySQL(pool, sql)
  }

  async createDatabaseIfNotExists() {
    const pool = mysql.createPool({
      host: settings.database.sequelize.maria_mysql.host,
      port: settings.database.sequelize.maria_mysql.port,
      user: settings.database.sequelize.maria_mysql.username,
      password: settings.database.sequelize.maria_mysql.password,
    })
    await this.checkDatabaseIfExists(pool)
    await this.createDatabase(pool)
    await pool.end()
  }

  asyncQuerySQL(pool, sql) {
    logColor('SERVER:DATABASE:SQL', sql)
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err != null) {
          logColor('SERVER:DATABASE:SQL:ERROR', err?.toString(), 'fg.red')
          return reject(err)
        }
        if (result) {
          //console.log('[DATABASE:SQL:RESULT] - ', result)
          return resolve(result)
        }
      })
    })
  }
}

module.exports = { MariaMySQL }
