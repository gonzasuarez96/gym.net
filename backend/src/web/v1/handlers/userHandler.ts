import { Request, Response } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';

export const getAllUsersHandler = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  
  export const getUserByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await getUserById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  
  export const createUserHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  
  export const updateUserHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await updateUser(req.params.id, req.body);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  
  export const deleteUserHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      await deleteUser(req.params.id);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };