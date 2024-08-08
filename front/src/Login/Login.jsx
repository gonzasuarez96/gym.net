import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { urlProduction } from "../utils/data";
import { displayFailedMessage, displaySuccessMessage } from "../utils/toastyfy";
import { ToastContainer } from "react-toastify";
//STYLE
import style from "./Login.module.css";

const Login = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${urlProduction}/auth`, {
        email,
        password
      });
      const { accessToken, user } = response.data;
      console.log('Login success:', response.data);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      displaySuccessMessage("Sesion iniciada.")
      setTimeout(() => {
        window.location.href = '/';
      }, 2000); 
      // Aquí podrías almacenar el token en el local storage o manejar la respuesta como necesites
    } catch (error) {
      console.error('Login error:', error);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      displayFailedMessage("Error al iniciar sesion.")
    }
  };

  const handleRegisterClick = () => {
    closeModal();
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Iniciar Sesión</h2>
      <form className={style.form} onSubmit={handleLogin}>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@gmail.com"
            className={style.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="password">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={style.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={style.error}>{error}</p>}
        <div className={style.buy}>
          <input type="submit" value="Ingresar" className={style.button} />
        </div>
      </form>
      <Link to="/formulario" className={style.link} onClick={handleRegisterClick}>
        <p className={style.registrate}>¿No tienes cuenta? Regístrate acá</p>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Login;
