//STYLE
import style from './FormLogin.module.css';
import { useState } from 'react';
import axios from 'axios';
import { urlProduction } from '../utils/data';
import { displayFailedMessage, displaySuccessMessage } from '../utils/toastyfy';
import { ToastContainer } from 'react-toastify';

const FormLogin = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    birth_date: '',
    role: 'user', // Puedes cambiar esto según sea necesario
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${urlProduction}/register`, formData);
      console.log('User registered:', response.data);
      displaySuccessMessage("Te registraste con exito.");
      setTimeout(() => {
        window.location.href = '/';
      }, 2000); 
      // Aquí puedes manejar el éxito del registro (p.ej., redirigir al usuario, mostrar un mensaje, etc.)
    } catch (error) {
      console.error('Error registering user:', error);
      displayFailedMessage("Error en realizar el registro de usuario.");
      // Aquí puedes manejar el error (p.ej., mostrar un mensaje de error)
    }
  };

  return (
    <div className={style.container}>
      <div className={style.containerform}>
        <h3 className={style.title}>
          Regístrate para
          <br />
          empezar a disfrutar de
          <br />
          nuestro servicios
        </h3>
        <form className={style.form} onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Ingrese su nombre"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="last_name"> Apellido: </label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            placeholder="Ingrese su apellido"
            value={formData.last_name}
            onChange={handleChange}
          />
          <label htmlFor="email"> Email: </label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="ejemplo@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password"> Contraseña: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="phone_number"> Teléfono: </label>
          <input
            id="phone_number"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <label htmlFor="address"> Dirección: </label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Ingrese su dirección"
            value={formData.address}
            onChange={handleChange}
          />
          <label htmlFor="birth_date"> Fecha de nacimiento: </label>
          <input
            id="birth_date"
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
          />
          <div className={style.buy}>
            <input
              type="submit"
              value="Registrarse!"
              className={style.button}
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FormLogin;
