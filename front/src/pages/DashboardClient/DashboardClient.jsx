import User from '../User/Users';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import style from './DashboardClient.module.css';
import posterUser from '../../../public/user/posterUser.svg';
import imgReservation from '../../../public/user/imgReservation.svg';
import { useState } from 'react';


Modal.setAppElement('#root');

const DashboardClient = () => {
  const [startDate, setStartDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState([
    { name: 'Yoga', date: '2024-08-01', startTime: '08:00', endTime: '09:00' },
    {
      name: 'Pilates',
      date: '2024-08-02',
      startTime: '10:00',
      endTime: '11:00',
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && selectedTime) {
      const endTime = new Date(startDate);
      endTime.setHours(parseInt(selectedTime.split(':')[0]) + 1);
      const endTimeString = endTime
        .toTimeString()
        .split(' ')[0]
        .substring(0, 5);

      const newClass = {
        name: 'Nueva Clase', // Puedes cambiar esto según la clase reservada
        date: startDate.toISOString().split('T')[0], // Solo la fecha en formato YYYY-MM-DD
        startTime: selectedTime,
        endTime: endTimeString,
      };

      setClasses([...classes, newClass]);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  return (
    <div className={style.container}>
      <div>
        <picture>
          <img
            src={posterUser}
            alt="poster usuario"
            className={style.posterUser}
          />
        </picture>
      </div>
      <section className={style.content}>
        <div className={style.welcomeUser}>
          <h2>¡Hola! Gonzalo Suarez</h2>
        </div>

        <div className={style.contWelcome}>
          <div>
            <User />
          </div>

          <section className={style.contReservation}>
            <picture className={style.contImg}>
              <img
                src={imgReservation}
                alt="usuario reserva"
                className={style.imgReservation}
              />
            </picture>

            <div className={style.reservation}>
              <h3>Reservar Clases</h3>
              <form className={style.formReserva} onSubmit={handleSubmit}>
                <div>
                  <button
                    type="button"
                    onClick={openModal}
                    className={style.openDatePicker}
                  >
                    {startDate
                      ? startDate.toLocaleDateString()
                      : 'Seleccionar Fecha'}
                  </button>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className={style.timeSelect}
                  >
                    <option value="">HORA</option>
                    {[
                      '08:00',
                      '09:00',
                      '10:00',
                      '11:00',
                      '12:00',
                      '13:00',
                      '14:00',
                      '15:00',
                      '16:00',
                      '17:00',
                      '18:00',
                      '19:00',
                      '20:00',
                    ].map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className={style.buttonReser}>
                  RESERVAR
                </button>
              </form>

              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Seleccionar Fecha"
                className={style.modal}
                overlayClassName={style.overlay}
              >
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    closeModal();
                  }}
                  inline
                  calendarClassName={style.calendar}
                />
                <button onClick={closeModal} className={style.closeModalButton}>
                  Cerrar
                </button>
              </Modal>
            </div>
          </section>
        </div>
      </section>

      <section className={style.classesSection}>
        <h3>Tus Clases</h3>
        <table className={style.classesTable}>
          <thead>
            <tr>
              <th>Clase</th>
              <th>Fecha</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {classes.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="5">No tienes clases registradas</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {classes.map((classItem, index) => (
                <tr key={index}>
                  <td>{classItem.name}</td>
                  <td>{classItem.date}</td>
                  <td>{classItem.startTime}</td>
                  <td>{classItem.endTime}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(index)}
                      className={style.deleteButton}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </section>
    </div>
  );
};

export default DashboardClient;
