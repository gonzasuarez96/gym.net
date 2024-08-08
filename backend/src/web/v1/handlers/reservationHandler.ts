import { Request, Response } from 'express';
import { createReservation, getAllReservations, getReservationById, updateReservation, deleteReservation } from '../controllers/reservationController';

export const createReservationHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const reservation = await createReservation(req.body);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  
  export const getAllReservationsHandler = async (_req: Request, res: Response): Promise<void> => {
    try {
      const reservations = await getAllReservations();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  
  export const getReservationByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const reservation = await getReservationById(req.params.id);
      if (reservation) {
        res.status(200).json(reservation);
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  
  export const updateReservationHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const reservation = await updateReservation(req.params.id, req.body);
      if (reservation) {
        res.status(200).json(reservation);
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  
  export const deleteReservationHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      await deleteReservation(req.params.id);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };