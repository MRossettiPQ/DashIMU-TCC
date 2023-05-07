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

export interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id?: CreationOptional<number>;
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function User(sequelize: Sequelize): CustomModelStatic {
  const User: CustomModelStatic = sequelize.define<UserModel>('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: ['ADMINISTRATOR', 'PHYSIOTHERAPIST', 'PATIENT'],
      defaultValue: 'PHYSIOTHERAPIST'
    }
  });

  User.associate = ({ Session }: LoadedCustomModels): CustomModelStatic => {
    User.hasMany(Session, {
      onDelete: 'CASCADE'
    });
    return User;
  };

  return User;
}
