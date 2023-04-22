import type {
  CustomModelStatic,
  LoadedCustomModels,
  Sequelize,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from '/@/custom-server/core/database';
import { DataTypes } from '/@/custom-server/core/database';

export interface GyroMeasurementModel
  extends Model<
    InferAttributes<GyroMeasurementModel>,
    InferCreationAttributes<GyroMeasurementModel>
  > {
  id?: CreationOptional<number>;
  sensorName: string;
  numberMensuration: string;
  hourMensuration: Date;
  Acc_X: number;
  Acc_Y: number;
  Acc_Z: number;
  AccelX_mss: number;
  AccelY_mss: number;
  AccelZ_mss: number;
  Gyr_X: number;
  Gyr_Y: number;
  Gyr_Z: number;
  Mag_X: number;
  Mag_Y: number;
  Mag_Z: number;
  Roll: number;
  Pitch: number;
  Yaw: number;
  Euler_X: number;
  Euler_Y: number;
  Euler_Z: number;
  Quaternion_X: number;
  Quaternion_Y: number;
  Quaternion_Z: number;
  Quaternion_W: number;
}

export default function GyroMeasurement(
  sequelize: Sequelize,
): CustomModelStatic<GyroMeasurementModel> {
  const GyroMeasurement: CustomModelStatic<GyroMeasurementModel> = sequelize.define(
    'gyro_measurements',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sensorName: {
        type: DataTypes.STRING,
      },
      numberMensuration: {
        type: DataTypes.INTEGER,
      },
      hourMensuration: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      Acc_X: {
        type: DataTypes.DECIMAL,
      },
      Acc_Y: {
        type: DataTypes.DECIMAL,
      },
      Acc_Z: {
        type: DataTypes.DECIMAL,
      },
      AccelX_mss: {
        type: DataTypes.DECIMAL,
      },
      AccelY_mss: {
        type: DataTypes.DECIMAL,
      },
      AccelZ_mss: {
        type: DataTypes.DECIMAL,
      },
      Gyr_X: {
        type: DataTypes.DECIMAL,
      },
      Gyr_Y: {
        type: DataTypes.DECIMAL,
      },
      Gyr_Z: {
        type: DataTypes.DECIMAL,
      },
      Mag_X: {
        type: DataTypes.DECIMAL,
      },
      Mag_Y: {
        type: DataTypes.DECIMAL,
      },
      Mag_Z: {
        type: DataTypes.DECIMAL,
      },
      Roll: {
        type: DataTypes.DECIMAL,
      },
      Pitch: {
        type: DataTypes.DECIMAL,
      },
      Yaw: {
        type: DataTypes.DECIMAL,
      },
      Euler_X: {
        type: DataTypes.DECIMAL,
      },
      Euler_Y: {
        type: DataTypes.DECIMAL,
      },
      Euler_Z: {
        type: DataTypes.DECIMAL,
      },
      Quaternion_X: {
        type: DataTypes.DECIMAL,
      },
      Quaternion_Y: {
        type: DataTypes.DECIMAL,
      },
      Quaternion_Z: {
        type: DataTypes.DECIMAL,
      },
      Quaternion_W: {
        type: DataTypes.DECIMAL,
      },
    },
  );

  GyroMeasurement.associate = ({
    Sensor,
    Session,
  }: LoadedCustomModels): CustomModelStatic<GyroMeasurementModel> => {
    GyroMeasurement.belongsTo(Session);
    GyroMeasurement.hasMany(Sensor, {
      onDelete: 'CASCADE',
    });
    return GyroMeasurement;
  };

  return GyroMeasurement;
}
