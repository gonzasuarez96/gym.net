import { Class } from "./Class";
import { Reservation } from "./Reservation";
import { User } from "./User";

// Configuración de relaciones
Class.belongsToMany(User, { through: Reservation, foreignKey: "class_id" });
User.belongsToMany(Class, { through: Reservation, foreignKey: "user_id" });

Reservation.belongsTo(User, { foreignKey: 'user_id' });
Reservation.belongsTo(Class, { foreignKey: 'class_id' });

// Exportar el archivo
export { Class, Reservation, User };
