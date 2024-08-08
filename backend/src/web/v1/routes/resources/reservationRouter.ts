import { Router } from 'express';
import { createReservationHandler, getAllReservationsHandler, getReservationByIdHandler, updateReservationHandler, deleteReservationHandler } from '../../handlers/reservationHandler';
import { authenticateAndAuthorize } from '../../middleware/authToken';

const reservationRouter = Router();

reservationRouter.get('/', authenticateAndAuthorize(['user', 'admin']), getAllReservationsHandler);
reservationRouter.get('/:id', authenticateAndAuthorize(['user', 'admin']), getReservationByIdHandler);
reservationRouter.post('/', authenticateAndAuthorize(['user','admin']), createReservationHandler);
reservationRouter.put('/:id', authenticateAndAuthorize(['admin']), updateReservationHandler);
reservationRouter.delete('/:id', authenticateAndAuthorize(['admin']), deleteReservationHandler);


export default reservationRouter;
