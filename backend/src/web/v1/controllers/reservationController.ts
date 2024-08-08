// services/reservationService.ts
import { Reservation } from  "../../../database/models/Reservation";

export const createReservation = async (data: {
  class_id: string;
  user_id: string;
  status: string;
}): Promise<Reservation> => {
  try {
    return await Reservation.create(data);
  } catch (error) {
    throw new Error(`Error creating reservation: ${(error as Error).message}`);
  }
};

export const getAllReservations = async (): Promise<Reservation[]> => {
  try {
    return await Reservation.findAll();
  } catch (error) {
    throw new Error(`Error fetching reservations: ${(error as Error).message}`);
  }
};

export const getReservationById = async (id: string): Promise<Reservation | null> => {
  try {
    return await Reservation.findByPk(id);
  } catch (error) {
    throw new Error(`Error fetching reservation: ${(error as Error).message}`);
  }
};

export const updateReservation = async (
  id: string,
  data: { class_id?: string; user_id?: string; status?: string }
): Promise<Reservation | null> => {
  try {
    const reservation = await Reservation.findByPk(id);
    if (reservation) {
      await reservation.update(data);
      return reservation;
    }
    return null;
  } catch (error) {
    throw new Error(`Error updating reservation: ${(error as Error).message}`);
  }
};

export const deleteReservation = async (id: string): Promise<void> => {
  try {
    const reservation = await Reservation.findByPk(id);
    if (reservation) {
      await reservation.destroy();
    }
  } catch (error) {
    throw new Error(`Error deleting reservation: ${(error as Error).message}`);
  }
};
