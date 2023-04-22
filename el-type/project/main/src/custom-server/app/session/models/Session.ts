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

export interface SessionModel
  extends Model<InferAttributes<SessionModel>, InferCreationAttributes<SessionModel>> {
  id?: CreationOptional<number>;
  date: Date;
  type: string;
  procedure: string;
}

export default function Session(sequelize: Sequelize): CustomModelStatic<SessionModel> {
  const Session: CustomModelStatic<SessionModel> = sequelize.define('sessions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['EXAMPLE', 'REAL'],
      defaultValue: 'REAL',
    },
    procedure: {
      type: DataTypes.ENUM,
      values: [
        'SHOULDER',
        'ELBOW',
        'RADIOULNAR',
        'WRIST',
        'CARPOMETACARPAL_THUMB',
        'METACARPOPHALANGEAL',
        'PROXIMAL_INTERPHALANGEAL',
        'DISTAL_INTERPHALANGEAL',
      ],
    },
  });

  Session.associate = ({
    Movement,
    Patient,
    User,
  }: LoadedCustomModels): CustomModelStatic<SessionModel> => {
    Session.hasMany(Movement, {
      onDelete: 'CASCADE',
    });
    Session.belongsTo(Patient);
    Session.belongsTo(User);
    return Session;
  };

  return Session;
}
