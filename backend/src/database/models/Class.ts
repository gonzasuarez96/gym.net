import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface ClassAttributes {
  id: string;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  day: string;
  capacity?: number;
  image?: string;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> {}

class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public start_time!: string;
  public end_time!: string;
  public day!: string;
  public capacity?: number;
  public image?: string;
}

Class.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    paranoid: true,
    deletedAt: "deleted_at"
  }
);

export { Class };
