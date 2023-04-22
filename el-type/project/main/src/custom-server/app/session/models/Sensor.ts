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

export interface SensorModel
  extends Model<InferAttributes<SensorModel>, InferCreationAttributes<SensorModel>> {
  id?: CreationOptional<number>;
  sensorName: string;
  position: string;
  type?: string;
  gyro_measurements?: [];
}

export default function Sensor(sequelize: Sequelize): CustomModelStatic<SensorModel> {
  const Sensor: CustomModelStatic<SensorModel> = sequelize.define('sensors', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sensorName: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.ENUM,
      values: ['ONE', 'TWO'],
    },
    type: {
      type: DataTypes.ENUM,
      values: ['GYROSCOPE', 'HUMIDITY'],
      defaultValue: 'GYROSCOPE',
    },
  });

  Sensor.associate = ({
    Movement,
    GyroMeasurement,
  }: LoadedCustomModels): CustomModelStatic<SensorModel> => {
    Sensor.belongsTo(Movement);
    Sensor.hasMany(GyroMeasurement, {
      onDelete: 'CASCADE',
    });
    return Sensor;
  };

  return Sensor;
}
