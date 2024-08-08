import { Router } from 'express';
import newUserRegisterHandler  from '../handlers/registerHandler';

const registerRouter = Router();

registerRouter.post('/', newUserRegisterHandler);

export default registerRouter;