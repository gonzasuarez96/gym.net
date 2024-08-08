import { Class } from "../../../database/models/Class";

interface ClassBody {
  name: string;
  description: string;
  start_time: string; // Assuming TIME is stored as string
  end_time: string; // Assuming TIME is stored as string
  day: string;
  capacity?: number;
}

interface NewClass {
  id: string;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  day: string;
  capacity?: number;
}

interface ClassUpdateBody {
  name?: string;
  description?: string;
  start_time?: string; // Assuming TIME is stored as string
  end_time?: string; // Assuming TIME is stored as string
  day?: string;
  capacity?: number;
}

// Crear clases
export const createClass = async (body: ClassBody): Promise<{ class: NewClass }> => {
  const { name, description, start_time, end_time, day, capacity } = body;

  if (!name || !description || !start_time || !end_time || !day) {
    const error = new Error("Incomplete information.");
    (error as any).status = 400;
    throw error;
  }

  try {
    const duplicate = await Class.findOne({
      where: { name, start_time, end_time, day }
    });

    if (duplicate) {
      const error = new Error("Class already exists at the same time.");
      (error as any).status = 409;
      throw error;
    }
    const newClass = await Class.create({
      name,
      description,
      start_time,
      end_time,
      day,
      capacity
    });

    const classData: NewClass = {
      id: newClass.id,
      name: newClass.name,
      description: newClass.description,
      start_time: newClass.start_time,
      end_time: newClass.end_time,
      day: newClass.day,
      capacity: newClass.capacity
    };

    return { class: classData };
  } catch (error) {
    if ((error as any).status) {
      (error as any).status = (error as any).status; // Mantén el código de estado original
    } else {
      (error as any).status = 500; // Asigna 500 si no se proporciona un código de estado
    }
    throw error;
  }
};

// Obtener todas las clases
export const getAllClasses = async (): Promise<Class[]> => {
  try {
    const classes = await Class.findAll();
    return classes;
  } catch (error) {
    throw new Error(`Error fetching classes: ${(error as Error).message}`);
  }
};

// Obtener una clase por ID
export const getClassById = async (id: string): Promise<Class | null> => {
  try {
    const classData = await Class.findByPk(id);
    if (!classData) {
      const error = new Error("Class not found.");
      (error as any).status = 404;
      throw error;
    }
    return classData;
  } catch (error) {
    throw new Error(`Error fetching class: ${(error as Error).message}`);
  }
};

export const updateClass = async (id: string, body: ClassUpdateBody): Promise<Class | null> => {
  try {
    const classData = await Class.findByPk(id);
    if (!classData) {
      const error = new Error("Class not found.");
      (error as any).status = 404;
      throw error;
    }
    await classData.update(body);
    return classData;
  } catch (error) {
    throw new Error(`Error updating class: ${(error as Error).message}`);
  }
};

export const deleteClass = async (id: string): Promise<{ message: string }> => {
  try {
    const classData = await Class.findByPk(id);
    if (!classData) {
      const error = new Error("Class not found.");
      (error as any).status = 404;
      throw error;
    }
    await classData.destroy();
    return { message: "Class successfully deleted." };
  } catch (error) {
    throw new Error(`Error deleting class: ${(error as Error).message}`);
  }
};
