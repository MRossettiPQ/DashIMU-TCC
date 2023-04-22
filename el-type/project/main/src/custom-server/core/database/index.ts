import type {
  ModelStatic,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { DataTypes, Sequelize, Model } from 'sequelize';
import { glob } from 'glob';
import { settings } from '/@/custom-server/settings';
import { translate } from '/@/custom-server/core/utils/i18nUtil';
import { logColor } from '/@/custom-server/core/utils/LogUtil';
import { throwError } from '/@/custom-server/core/utils/RequestUtil';
import { MariaDB } from '/@/custom-server/core/database/MariaDB';

export interface CustomModelStatic<T extends Model<any, any>> extends ModelStatic<T> {
  // Extensão com função que gera as associações entre as entidades
  associate?: (models: {
    [key: string]: ModelStatic<Model<any, any>>;
  }) => ModelStatic<Model<any, any>>;
}

export interface LoadedCustomModels {
  // Todos os modelos carregados no projeto
  [key: string]: CustomModelStatic<any> | CustomModelStatic<Model<any, any>>;
}

class CustomDatabase {
  // TODO Database connection using Sequelize - configure in settings
  sequelize?: Sequelize;
  mariadb?: MariaDB;
  models: LoadedCustomModels = {};

  constructor() {
    type SequelizeConf = keyof typeof settings.database.sequelize;
    const optKey = settings.database.dialect as SequelizeConf;
    //
    this.sequelize = new Sequelize({
      ...settings.database.sequelize[optKey],
      dialect: settings.database.dialect,
      logging: logMessage => logColor('SEQUELIZE:LOG', logMessage),
    });
  }

  async initDataBase() {
    try {
      switch (settings.database.dialect) {
        case 'mysql':
        case 'mariadb':
          this.mariadb = new MariaDB();
          // Before init sequelize
          await this.mariadb.createDatabaseIfNotExists();
          break;
        default:
          break;
      }

      // Init and sync sequelize
      // TODO - { force : false } option to drop the data from the database -> if true it will delete the entire database at each startup
      await this.sequelize?.sync({
        alter: settings.database.syncOptions.alter,
        force: settings.database.syncOptions.wipe_on_start,
      });
      logColor('SERVER:DATABASE', translate('database.rsync'));
    } catch (e: any) {
      logColor('SERVER:DATABASE', translate('database.rsync_error'), 'fg.red');
      throw Error(e.toString());
    }
  }

  async loadModels() {
    if (!settings.database.dialect) {
      return throwError({
        local: 'SERVER:SEQUELIZE:MODELS-ERROR',
        message: 'Dialect não foi descrito no .env',
        log: 'Dialect não foi descrito no .env',
      });
    }

    logColor('SERVER:SEQUELIZE', translate('sequelize.load_models'));
    // Exemplo:  import User from "../../app/User/Models/User";
    const modelsPath: string[] = await glob(
      './project/main/src/custom-server/app/**/models/**.ts',
      {
        posix: true,
      },
    );
    console.log(modelsPath);
    for (const filePath of modelsPath) {
      console.log(filePath);
      // const { default: model } = await import('..\\..\\app\\user\\models\\' + 'User');
      // const path = relative('./project/main/src/custom-server/app', filePath);
      // console.log(path);
      // const model = await require(filePath.slice(30, -3));
      // console.log(model);
      //   // Load model
      //   // const Model: CustomModelStatic = model(this.sequelize);
      //   // Object.assign(this.models, {[model.name]: Model});
      //   // Object.assign(this, {[model.name]: Model});
      //   // logColor('SERVER:SEQUELIZE:MODELS', model.name);
    }

    type ModelsKeys = keyof typeof this.models;
    // Find all associations, Model by Model
    for (const modelName of Object.keys(this.models)) {
      // Verifica se existe initialOptions para o service e realiza o merge deles
      const optKey = modelName as ModelsKeys;
      if (optKey) {
        const customModel: CustomModelStatic<any> = this.models[optKey];
        if (typeof customModel?.associate === 'function') {
          this.models[optKey] = customModel?.associate(this.models);
        }
      }
    }
  }
}

const Database: CustomDatabase = new CustomDatabase();

export { Database as default, Database, CustomDatabase, DataTypes, Sequelize, Model };
// TODO DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, Model são exports diretos do mesmos elementos do SEQUELIZE
export type { CreationOptional, InferAttributes, InferCreationAttributes };
