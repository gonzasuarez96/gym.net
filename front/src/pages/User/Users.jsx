import { useState } from 'react';
import styles from './Users.module.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  HomeIcon,
  PencilIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';
import { useForm } from '../../hooks/useForm';
import { displaySuccessMessage } from '../../utils/toastyfy'
import { ToastContainer } from 'react-toastify';

const User = () => {
  // const { user, setUser, setToken, token } = useUserContext();
  // const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, handleChange, setFormData] = useForm('');

  // const handleLogout = async () => {
  //   try {
  //     setUser(false);
  //     setToken(false);
  //     localStorage.removeItem('tokenRadcars');
  //     localStorage.removeItem('userRadcars');
  //     navigate('/login');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');

    // Redirect after 2 seconds
    displaySuccessMessage('Sesion finalizada.')
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  // const onValidate = (editedUser) => {
  //   let errors = {};
  //   let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;

  //   if (!editedUser.name.trim()) {
  //     errors.name = 'El campo "Nombre" no debe ser vacio.';
  //   } else if (!regexName.test(editedUser.name)) {
  //     errors.name = 'El campo "Nombre" es incorrecto.';
  //   }

  //   return errors;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const err = onValidate(formData);
  //   setErrors(err);

  //   if (Object.keys(err).length === 0) {
  //     try {
  //       const copyData = {
  //         cc: formData?.cc || '',
  //         name: formData?.name || '',
  //         phone: formData?.phone || '',
  //         email: formData?.email || '',
  //         address: formData?.address || '',
  //       };

  //       const headers = {
  //         'Content-Type': 'application/json',
  //       };
  //       if (token) {
  //         headers['Authorization'] = `Bearer ${token}`;
  //       }

  //       const response = await fetch(endPoints.users.updateUser(user?.id), {
  //         method: 'PUT',
  //         headers: headers,
  //         body: JSON.stringify(copyData),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Error en la solicitud: ' + response.statusText);
  //       }

  //       const data = await response.json();

  //       setUser(data.data);
  //       localStorage.setItem('userRadcars', JSON.stringify(data.data));
  //       setIsEditing(false);
  //       Swal.fire({
  //         text: 'Usuario editado con éxito',
  //         icon: 'success',
  //         confirmButtonText: 'Ok',
  //       });
  //     } catch (error) {
  //       console.error('Hubo un problema con la solicitud', error);
  //     }
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.buttonContainer}>
          <button className={styles.logoutButton} onClick={handleLogout}>Cerrar sesion</button>
        </div>
        <div className={styles.header}>
          <h1 className={styles.title}>MI CUENTA</h1>
        </div>
        <div className={styles.formContainer}>
          {isEditing ? (
            <form>
              <div className={styles.inputGroup}>
                <CommandLineIcon className={styles.icon} />
                <input
                  type="text"
                  name="cc"
                  value={formData.cc}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              {errors.cc && <p className={styles.errorMessage}>{errors.cc}</p>}
              <div className={styles.inputGroup}>
                <UserCircleIcon className={styles.icon} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              {errors.name && (
                <p className={styles.errorMessage}>{errors.name}</p>
              )}
              <div className={styles.inputGroup}>
                <EnvelopeIcon className={styles.icon} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email}</p>
              )}
              <div className={styles.inputGroup}>
                <PhoneIcon className={styles.icon} />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              {errors.phone && (
                <p className={styles.errorMessage}>{errors.phone}</p>
              )}
              <div className={styles.inputGroup}>
                <HomeIcon className={styles.icon} />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              {errors.address && (
                <p className={styles.errorMessage}>{errors.address}</p>
              )}
              <div className={styles.buttonGroup}>
                <button
                  onClick={handleEditToggle}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.saveButton}>
                  Guardar
                </button>
              </div>
            </form>
          ) : (
            <>
              <p className={styles.text}>
                <span>
                  <CommandLineIcon className={styles.icon} />{' '}
                </span>
                CC:
              </p>
              <p className={styles.text}>
                <span>
                  <UserCircleIcon className={styles.icon} />
                </span>{' '}
                Nombre:
              </p>
              <p className={styles.text}>
                <span>
                  <EnvelopeIcon className={styles.icon} />
                </span>{' '}
                Correo:
              </p>
              <p className={styles.text}>
                <span>
                  <PhoneIcon className={styles.icon} />
                </span>{' '}
                Teléfono:
              </p>
              <p className={styles.text}>
                <span>
                  <HomeIcon className={styles.icon} />
                </span>{' '}
                Dirección: av5# 12- 109 conjunto la manuela
              </p>
              <div className={styles.editButtonContainer}>
                <button
                  onClick={handleEditToggle}
                  className={styles.editButton}
                >
                  <PencilIcon className={styles.icon} /> Editar Perfil
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default User;