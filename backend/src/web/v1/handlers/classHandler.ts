import { Request, Response } from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass
} from "../controllers/classController";

export const createClassHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const newClass = await createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status((error as any).status || 500).json({ error: (error as Error).message });
  }
};

export const getAllClassesHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const classes = await getAllClasses();
    res.json(classes);
  } catch (error) {
    res.status((error as any).status || 500).json({ error: (error as Error).message });
  }
};

export const getClassByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const classData = await getClassById(req.params.id);
    res.json(classData);
  } catch (error) {
    res.status((error as any).status || 500).json({ error: (error as Error).message });
  }
};

export const updateClassHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedClass = await updateClass(req.params.id, req.body);
    res.json(updatedClass);
  } catch (error) {
    res.status((error as any).status || 500).json({ error: (error as Error).message });
  }
};

export const deleteClassHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteClass(req.params.id);
    res.json(result);
  } catch (error) {
    res.status((error as any).status || 500).json({ error: (error as Error).message });
  }
};
