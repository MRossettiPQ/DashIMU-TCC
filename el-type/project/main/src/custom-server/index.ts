import Database from '/@/custom-server/core/database';
import { logColor } from '/@/custom-server/core/utils/LogUtil';
import { translate, i18n } from '/@/custom-server/core/utils/i18nUtil';
import { settings } from '/@/custom-server/settings';
import type { Express } from 'express';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import type { Instance as ExpressWebSocket } from 'express-ws';
import enableWs from 'express-ws';

export interface ExpressWs extends Express {
  ws?: any;
}

class CustomServer {
  loading = false;
  started = false;
  database = Database;
  app?: Express;
  expressWs?: ExpressWebSocket;
  settings = settings;

  async boot() {
    try {
      this.loading = true;
      logColor('SERVER', translate('main.init'), 'fg.blue');
      await this.database.loadModels();

      // Only after models are loaded
      logColor('SERVER', translate('main.load_routes'));
      const { routes } = await import('./routes');

      // Instance express
      this.app = express();

      // Internationalization
      this.app.use(i18n.init);

      // Database initialization (Connection and sync database)
      await Database.initDataBase();

      // Cors rules
      this.app.use(cors());

      // Folder containing the SPA project after the build is performed
      this.app.use(express.static(__dirname + '/public'));

      // Parse requests of content-type - application/json
      this.app.use(bodyParser.json({ limit: '50mb' }));

      // Parse requests of content-type - application/x-www-form-urlencoded
      this.app.use(bodyParser.urlencoded({ extended: true }));

      // Active web-socket on app express
      this.expressWs = enableWs(this.app);

      // Morgan logging
      this.app.use(morgan(settings.morgan.format));

      // Routes
      routes(this.app, this.expressWs);

      // Listen server in port
      await this.listen();
      logColor('SERVER', `${translate('main.initialized')} ${settings.host.port}`, 'fg.blue');
      this.started = true;
    } catch (e: any) {
      console.log('Catch do servidor');
      console.log(e);
      throw Error(e);
    } finally {
      this.loading = false;
    }
  }

  async listen() {
    return new Promise((resolve, reject) => {
      if (!this.app) {
        return reject();
      }

      const server = this.app.listen(settings.host.port);
      process.once('uncaughtException', reject);
      server.once('error', reject);
      server.once('listening', resolve);
    });
  }

  async close(): Promise<void> {
    // return this.app.close();
  }
}

export { CustomServer, CustomServer as default };
