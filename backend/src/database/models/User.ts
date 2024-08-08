import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface UserAttributes {
  id: string;
  email: string;
  password: string;
  name: string;
  last_name: string;
  phone_number: string;
  address: string;
  birth_date: Date;
  role: string;
  refreshToken?: string;
  suscripted?: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public name!: string;
  public last_name!: string;
  public phone_number!: string;
  public address!: string;
  public birth_date!: Date;
  public role!: string;
  public refreshToken?: string;
  public suscripted?: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: { 
      type: DataTypes.STRING,
      allowNull: true, 
    },
    suscripted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    }
  },
  {
    sequelize,
    paranoid: true,
    deletedAt: 'deleted_at',
    tableName: 'users',
  }
);

export { User }

