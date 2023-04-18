import { CustomModelStatic, DataTypes, LoadedCustomModels, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "../../../core/database";

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id?: CreationOptional<number>;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthday: Date;
  stature: number;
}

export default function User(sequelize: Sequelize): CustomModelStatic {
  const Patient: CustomModelStatic = sequelize.define<UserModel>("patients", {
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

  Patient.associate = ({ Session }: LoadedCustomModels): CustomModelStatic => {
    Patient.hasMany(Session, {
      onDelete: "CASCADE",
    });
    return Patient;
  };

  return Patient;
}
