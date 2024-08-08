import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface ReservationAttributes {
  id: string;
  class_id: string;
  user_id: string;
  status: string;
}

interface ReservationCreationAttributes extends Optional<ReservationAttributes, 'id'> {}

class Reservation extends Model<ReservationAttributes, ReservationCreationAttributes> implements ReservationAttributes {
  public id!: string;
  public class_id!: string;
  public user_id!: string;
  public status!: string;
}

Reservation.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    class_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Classes', // Nombre de la tabla de clases
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users', // Nombre de la tabla de usuarios
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending' // Puede ser 'pending', 'confirmed', 'cancelled', etc.
    }
  },
  {
    sequelize,
    paranoid: true,
    deletedAt: "deleted_at",
    timestamps: true // Esto agregará createdAt y updatedAt automáticamente
  }
);

export { Reservation };
