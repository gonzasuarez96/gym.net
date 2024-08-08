import { User } from "../../../database/models/User";

export const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "email",
        "name",
        "last_name",
        "phone_number",
        "address",
        "birth_date",
        "role",
        "createdAt",
        "updatedAt"
      ]
    });
    return users;
  } catch (error) {
    throw new Error("Error al obtener usuarios");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findByPk(id, {
      attributes: [
        "id",
        "email",
        "name",
        "last_name",
        "phone_number",
        "address",
        "birth_date",
        "role",
        "createdAt",
        "updatedAt"
      ]
    });
    if (user) {
      return user;
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    throw new Error("Error al obtener el usuario");
  }
};

export const createUser = async (userData: any) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error("Error al crear el usuario");
  }
};

export const updateUser = async (id: string, userData: any) => {
  try {
    const [updated] = await User.update(userData, { where: { id } });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      return updatedUser;
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    throw new Error("Error al actualizar el usuario");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      return;
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    throw new Error("Error al eliminar el usuario");
  }
};
