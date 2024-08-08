import { Router } from 'express';
import { createClassHandler, getAllClassesHandler, getClassByIdHandler, updateClassHandler, deleteClassHandler } from '../../handlers/classHandler';
import { authenticateAndAuthorize } from '../../middleware/authToken';


const classRouter = Router();

// Rutas que requieren autenticación
classRouter.post('/', authenticateAndAuthorize(['admin']), createClassHandler);
classRouter.put('/:id', authenticateAndAuthorize(['admin']), updateClassHandler);
classRouter.delete('/:id', authenticateAndAuthorize(['admin']), deleteClassHandler);

// Rutas que no requieren autenticación
classRouter.get('/', getAllClassesHandler);
classRouter.get('/:id', getClassByIdHandler);

export default classRouter;
