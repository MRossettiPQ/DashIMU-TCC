import { DataTypes } from '/@/custom-server/core/database';
import type {
  CreationOptional,
  CustomModelStatic,
  InferAttributes,
  InferCreationAttributes,
  LoadedCustomModels,
  Model,
  Sequelize,
} from '../../../core/database';

export interface PatientModel
  extends Model<InferAttributes<PatientModel>, InferCreationAttributes<PatientModel>> {
  id?: CreationOptional<number>;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthday: Date;
  stature: number;
}

export default function User(sequelize: Sequelize): CustomModelStatic<PatientModel> {
  const Patient: CustomModelStatic<PatientModel> = sequelize.define('patients', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    stature: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  });

  Patient.associate = ({ Session }: LoadedCustomModels): CustomModelStatic<PatientModel> => {
    Patient.hasMany(Session, {
      onDelete: 'CASCADE',
    });
    return Patient;
  };

  return Patient;
}
