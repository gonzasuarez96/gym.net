import { Router } from "express";
import registerRouter from "./routes/register";
import authRouter from "./routes/auth";
import refreshRouter from "./routes/refresh";
import classRouter from "./routes/resources/classRouter";
import reservationRouter from "./routes/resources/reservationRouter";
import userRouter from "./routes/resources/userRouter";

const router = Router();


// Auth Server
router.use('/register', registerRouter);
router.use('/auth', authRouter);
router.use('/refresh', refreshRouter)

// Resource Server
router.use('/classes', classRouter);
router.use('/reservations', reservationRouter);
router.use('/users', userRouter)



export default router;
