import { Router } from 'express';
import userLoginHandler from "../handlers/authHandler";

const authRouter = Router();

authRouter.post('/', userLoginHandler);

export default authRouter;