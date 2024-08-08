import React from 'react';
import axios from 'axios';
import style from './CardActivity.module.css';
import { urlProduction } from '../../utils/data';
import {displayFailedMessage , displaySuccessMessage} from '../../utils/toastyfy';
import { ToastContainer } from 'react-toastify';

const CardActivity = ({ image, title, info, day, capacity, start_time, id }) => {

  const handleReserve = async () => {
    try {
      // Recupera la información del usuario desde localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const accessToken = localStorage.getItem('accessToken');
      const userId = user?.id;

      if (!userId || !accessToken) {
        alert('Usuario no autenticado.');
        return;
      }

      const reservationData = {
        class_id: id,
        user_id: userId,
        status: 'reserved'
      };

      console.log(reservationData)
      console.log(accessToken)
      const response = await axios.post(`${urlProduction}/reservations`, reservationData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response)
      displaySuccessMessage("Reserva creada con exito.")
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      displayFailedMessage('Hubo un error al crear la reserva.')
    }
  };

  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <img src={image} alt="imagen de la actividad" className={style.image} />
        <h2 className={style.imageText}>{title}</h2>
      </div>
      <div className={style.info}>
        <p>{info}</p>
        <p>{day}</p>
        <p>{start_time}</p>
        <p>Capacidad: {capacity}</p>
      </div>
      <div className={style.buy}>
        <input 
          type="submit" 
          value="Reservar" 
          className={style.button} 
          onClick={handleReserve}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CardActivity;
