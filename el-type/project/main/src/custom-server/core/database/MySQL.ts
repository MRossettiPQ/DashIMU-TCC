import type { Pool, QueryError } from 'mysql2';
import mysql from 'mysql2';
import { settings } from '/@/custom-server/settings';
import { logColor } from '/@/custom-server/core/utils/LogUtil';

class MySQL {
  async createDatabase(pool: Pool) {
    const sql = `CREATE DATABASE IF NOT EXISTS ${settings.database.sequelize.maria_mysql.database};`;
    return await this.asyncQuerySQL(pool, sql);
  }

  async checkDatabaseIfExists(pool: Pool) {
    const sql = `SHOW DATABASES LIKE "${settings.database.sequelize.maria_mysql.database}"`;
    return await this.asyncQuerySQL(pool, sql);
  }

  async createDatabaseIfNotExists() {
    const pool = mysql.createPool({
      host: settings.database.sequelize.maria_mysql.host,
      port: settings.database.sequelize.maria_mysql.port,
      user: settings.database.sequelize.maria_mysql.username,
      password: settings.database.sequelize.maria_mysql.password,
    });
    await this.checkDatabaseIfExists(pool);
    await this.createDatabase(pool);
    await pool.end();
  }

  asyncQuerySQL(pool: Pool, sql: string) {
    logColor('SERVER:DATABASE:SQL', sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err: QueryError, result: any) => {
        if (err != null) {
          logColor('SERVER:DATABASE:SQL:ERROR', err?.toString(), 'fg.red');
          return reject(err);
        }
        if (result) {
          //console.log('[DATABASE:SQL:RESULT] - ', result)
          return resolve(result);
        }
      });
    });
  }
}

export { MySQL };
