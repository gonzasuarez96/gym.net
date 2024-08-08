import User from '../User/Users';
import Modal from '../../Modal/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import style from './DashboardAdmin.module.css';
import { useState, useEffect } from 'react';
import FormLogin from '../../FormLogin/FormLogin';
import { Modal as Modals } from 'react-modal';
import axios from 'axios';
import { urlProduction } from '../../utils/data';
import { displayFailedMessage, displaySuccessMessage } from '../../utils/toastyfy';
import { ToastContainer } from 'react-toastify';



const DashboardAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${urlProduction}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const [newUser, setNewUser] = useState({
    id: '',
    email: '',
    password: '',
    name: '',
    last_name: '',
    phone_number: '',
    address: '',
    birth_date: '',
    role: '',
    classes: [],
  });

  const handleDeleteUser = async (id) => {
    console.log('users:',users)
    console.log('id:',id)
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const accessToken = localStorage.getItem('accessToken');
      const userId = user?.id;
      if (!userId || !accessToken) {
        alert('Usuario no autenticado.');
        return;
      }
      const response = await axios.delete(`${urlProduction}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      displaySuccessMessage('Usuario eliminado.')
    } catch (error) {
      displayFailedMessage('Error al eliminar el usuario.')
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteReservation = (userIndex, classIndex) => {
    const updatedUsers = [...users];
    updatedUsers[userIndex].classes.splice(classIndex, 1);
    setUsers(updatedUsers);
  };

  return (
    <div className={style.container}>
      <section className={style.content}>
        <div className={style.welcomeUser}>
          <h2>¡Hola! Administrador</h2>
        </div>

        <div className={style.contWelcome}>
          <div>
            <User />
          </div>

          <section className={style.contUser}></section>
        </div>
      </section>

      <section className={style.classesSection}>
        <h3>Usuarios</h3>
        <table className={style.classesTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {users.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="2">No hay usuarios registrados</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {users.map((user, id) => (
                <tr key={id}>
                  <td>{`${user.name} ${user.last_name}`}</td>
                  <td>
                    <button
                      onClick={() => openModal(user)}
                      className={style.deleteButton}
                    >
                      Ver Clases
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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

      {selectedUser && (
        <Modals
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Clases del Usuario"
          className={style.modal}
          overlayClassName={style.overlay}
        >
          <h3>
            Clases de {selectedUser.name} {selectedUser.last_name}
          </h3>
          {selectedUser.classes && selectedUser.classes.length === 0 ? (
            <p>No tiene clases reservadas</p>
          ) : (
            <table className={style.claseItem}>
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Fecha</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.classes.map((classItem, classIndex) => (
                  <tr key={classIndex}>
                    <td>{classItem.name}</td>
                    <td>{classItem.date}</td>
                    <td>{classItem.startTime}</td>
                    <td>{classItem.endTime}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleDeleteReservation(
                            users.indexOf(selectedUser),
                            classIndex
                          )
                        }
                        className={style.deleteButton}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button onClick={closeModal} className={style.closeModalButton}>
            Cerrar
          </button>
        </Modals>
      )}
      <ToastContainer />
    </div>
  );
};

export default DashboardAdmin;
