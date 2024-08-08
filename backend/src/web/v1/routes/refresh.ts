import { Router } from 'express';
import { refreshTokenHandler } from '../handlers/refreshHandler';

const refreshRouter = Router();

refreshRouter.get('/', refreshTokenHandler);

export default refreshRouter;