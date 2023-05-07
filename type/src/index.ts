import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelStatic,
  OrderItem,
  Sequelize
} from 'sequelize';
import { resolve } from 'node:path';
import { glob } from 'glob';
import { PaginationUtil } from './core/PaginationUtil';
import { UserModel } from './app/User';
import { PatientModel } from './app/Patient';

export interface CustomModelStatic extends ModelStatic<any> {
  // Extension with a function that generates associations between entities
  associate?: Function;
}

export interface LoadedCustomModels {
  // All models loaded in the project
  [key: string]: CustomModelStatic;
}

const configNewSession = ({
  Movement,
  Sensor,
  GyroMeasurement
}: LoadedCustomModels) => {
  return {
    include: [
      {
        model: Movement,
        include: [
          {
            model: Sensor,
            include: [
              {
                model: GyroMeasurement
              }
            ]
          }
        ]
      }
    ]
  };
};

const valuesSession = (user: UserModel, patient: PatientModel) => {
  return {
    procedure: 'SHOULDER',
    userId: user.id,
    patientId: patient.id,
    movements: [
      {
        type: 'FLEXION',
        sensors: [
          {
            sensorName: 'SENSOR_1',
            position: 'ONE',
            type: 'GYROSCOPE',
            gyro_measurements: [
              {
                sensorName: 'SENSOR_1',
                numberMensuration: 1,
                hourMensuration: '1995-11-09 01:44:13.488 +00:00',
                Acc_X: 0,
                Acc_Y: 0,
                Acc_Z: 0,
                AccelX_mss: 0,
                AccelY_mss: 0,
                AccelZ_mss: 0,
                Gyr_X: 0,
                Gyr_Y: 0,
                Gyr_Z: 0,
                Mag_X: 0,
                Mag_Y: 0,
                Mag_Z: 0,
                Roll: 0,
                Pitch: 0,
                Yaw: 0,
                Euler_X: 0,
                Euler_Y: 0,
                Euler_Z: 0,
                Quaternion_X: 0,
                Quaternion_Y: 0,
                Quaternion_Z: 0,
                Quaternion_W: 0
              }
            ]
          },
          {
            sensorName: 'SENSOR_2',
            position: 'TWO',
            type: 'GYROSCOPE',
            gyro_measurements: [
              {
                sensorName: 'SENSOR_2',
                numberMensuration: 1,
                hourMensuration: '1995-11-09 01:44:13.488 +00:00',
                Acc_X: 0,
                Acc_Y: 0,
                Acc_Z: 0,
                AccelX_mss: 0,
                AccelY_mss: 0,
                AccelZ_mss: 0,
                Gyr_X: 0,
                Gyr_Y: 0,
                Gyr_Z: 0,
                Mag_X: 0,
                Mag_Y: 0,
                Mag_Z: 0,
                Roll: 0,
                Pitch: 0,
                Yaw: 0,
                Euler_X: 0,
                Euler_Y: 0,
                Euler_Z: 0,
                Quaternion_X: 0,
                Quaternion_Y: 0,
                Quaternion_Z: 0,
                Quaternion_W: 0
              }
            ]
          }
        ]
      }
    ]
  };
};

class App {
  sequelize?: Sequelize;
  models: LoadedCustomModels = {};
  loading = false;

  async load() {
    console.log('Load models');
    // Grab paths from all models
    const dirName = resolve(__dirname, './app');
    const modelsPath = await glob(`./**.ts`, {
      cwd: dirName,
      absolute: true
    });

    // Load all project templates
    for (const filePath of modelsPath) {
      const { default: model } = await import(resolve(filePath));
      // Load model
      const Model = model(this.sequelize);
      Object.assign(this.models, { [model.name]: Model });
      // console.log("Model: ", model.name);
    }
    // Find all associations, Model by Model
    for (const modelName of Object.keys(this.models)) {
      // Checks if initialOptions exists for the service and merges them
      const customModel = this.models[modelName];
      if (typeof customModel?.associate === 'function') {
        this.models[modelName] = customModel?.associate(this.models);
      }
    }
    console.log('Models:', this.models);
  }

  async boot() {
    try {
      this.loading = true;
      this.sequelize = new Sequelize({
        storage: 'tests.sqlite',
        dialect: 'sqlite',
        // benchmark: true,
        // logging: (logMessage) => console.log(logMessage),
        logging: false
      });
      await this.load();
      //
      await this.sequelize?.sync({ force: true });

      const { GyroMeasurement, Sensor, Movement, User, Session, Patient } =
        this.models;

      const user = await User.create({
        username: 'mrossettipq',
        name: 'Matheus Rossetti',
        email: 'mrossetti@gmail.com',
        password: '123321',
        role: 'ADMINISTRATOR'
      });

      const patient = await Patient.create({
        name: 'Matheus Rossetti',
        cpf: '101.290.359-12',
        email: 'mrossetti@gmail.com',
        phone: '48999274964',
        birthday: '1995-11-09 01:44:13.488 +00:00',
        stature: 1.91
      });

      const newSession = await Session.create(
        valuesSession(user, patient),
        configNewSession(this.models)
      );

      const newSession2 = await Session.create(
        valuesSession(user, patient),
        configNewSession(this.models)
      );

      const pagination = await PaginationUtil(GyroMeasurement, {
        options: {
          include: [
            {
              model: Sensor,
              include: [
                {
                  model: Movement,
                  where: {
                    sessionId: newSession.id
                  }
                }
              ],
              where: {
                movementId: 1
              }
            }
          ]
        },
        order: [
          ['sensorId', 'ASC'],
          ['numberMensuration', 'ASC']
        ]
      });
      // console.log(pagination.resultList);
      for (const measurement of pagination.resultList) {
        delete measurement.dataValues.sensor;
        const justMeasurement = measurement.dataValues;

        console.table(justMeasurement);
      }
      // console.table(pagination);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}

const run = (async () => {
  const tests = new App();
  await tests.boot();
})();

export {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  Sequelize,
  OrderItem,
  App
};
