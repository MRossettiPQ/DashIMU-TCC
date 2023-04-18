import { CustomModelStatic, DataTypes, LoadedCustomModels, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "../../../core/database";

export interface MovementModel extends Model<InferAttributes<MovementModel>, InferCreationAttributes<MovementModel>> {
  id?: CreationOptional<number>;
  type: string;
  sensors?: [];
}

export default function Movement(sequelize: Sequelize): CustomModelStatic {
  const Movement: CustomModelStatic = sequelize.define<MovementModel>("movements", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        "FLEXION",
        "EXTENSION",
        "ADDUCTION",
        "ABDUCTION",
        "INTERNAL_ROTATION",
        "EXTERNAL_ROTATION",
        "PRONATION",
        "SUPINATION",
        "THUMB_INTERNAL_FLEXION",
        "THUMB_INTERNAL_EXTENSION",
        "INTERNAL_EXTENSION_FINGERS",
        "ULNAR_ADDUCTION",
        "RADIAL_ADDUCTION",
      ],
    },
  });

  Movement.associate = ({ Sensor, Session }: LoadedCustomModels): CustomModelStatic => {
    Movement.belongsTo(Session);
    Movement.hasMany(Sensor, {
      onDelete: "CASCADE",
    });
    return Movement;
  };

  return Movement;
}
