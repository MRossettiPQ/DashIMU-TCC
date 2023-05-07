import {
  CreationOptional,
  CustomModelStatic,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  LoadedCustomModels,
  Model,
  Sequelize
} from '../index';

export interface SensorModel
  extends Model<
    InferAttributes<SensorModel>,
    InferCreationAttributes<SensorModel>
  > {
  id?: CreationOptional<number>;
  sensorName: string;
  position: string;
  type?: string;
  gyro_measurements?: [];
}

export default function Sensor(sequelize: Sequelize): CustomModelStatic {
  const Sensor: CustomModelStatic = sequelize.define<SensorModel>('sensors', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sensorName: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.ENUM,
      values: ['ONE', 'TWO']
    },
    type: {
      type: DataTypes.ENUM,
      values: ['GYROSCOPE', 'HUMIDITY'],
      defaultValue: 'GYROSCOPE'
    }
  });

  Sensor.associate = ({
    Movement,
    GyroMeasurement
  }: LoadedCustomModels): CustomModelStatic => {
    Sensor.belongsTo(Movement);
    Sensor.hasMany(GyroMeasurement, {
      onDelete: 'CASCADE'
    });
    return Sensor;
  };

  return Sensor;
}
