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

export interface MovementModel
  extends Model<InferAttributes<MovementModel>, InferCreationAttributes<MovementModel>> {
  id?: CreationOptional<number>;
  type: string;
  sensors?: [];
}

export default function Movement(sequelize: Sequelize): CustomModelStatic<MovementModel> {
  const Movement: CustomModelStatic<MovementModel> = sequelize.define('movements', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        'FLEXION',
        'EXTENSION',
        'ADDUCTION',
        'ABDUCTION',
        'INTERNAL_ROTATION',
        'EXTERNAL_ROTATION',
        'PRONATION',
        'SUPINATION',
        'THUMB_INTERNAL_FLEXION',
        'THUMB_INTERNAL_EXTENSION',
        'INTERNAL_EXTENSION_FINGERS',
        'ULNAR_ADDUCTION',
        'RADIAL_ADDUCTION',
      ],
    },
  });

  Movement.associate = ({
    Sensor,
    Session,
  }: LoadedCustomModels): CustomModelStatic<MovementModel> => {
    Movement.belongsTo(Session);
    Movement.hasMany(Sensor, {
      onDelete: 'CASCADE',
    });
    return Movement;
  };

  return Movement;
}
