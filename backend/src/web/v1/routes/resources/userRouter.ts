import { Router } from 'express';
import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler } from '../../handlers/userHandler';
import { authenticateAndAuthorize } from '../../middleware/authToken';

const userRouter = Router();

// Rutas que no requieren autenticación
userRouter.get('/', getAllUsersHandler);
userRouter.get('/:id', getUserByIdHandler);

// Rutas que requieren autenticación
userRouter.post('/', authenticateAndAuthorize(['admin']), createUserHandler);
userRouter.put('/:id', authenticateAndAuthorize(['admin']), updateUserHandler);
userRouter.delete('/:id', authenticateAndAuthorize(['admin']), deleteUserHandler);

export default userRouter;