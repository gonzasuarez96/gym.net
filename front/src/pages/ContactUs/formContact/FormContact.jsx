import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import Swal from 'sweetalert2';
import style from './FormContact.module.css';

const FormContact = () => {
  const initialForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  const [formData, handleChange, setFormData] = useForm(initialForm);

  const [errors, setErrors] = useState({});

  const onValidate = (formData) => {
    let errors = {};
    let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPhone = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜüs]){5,15}$/;
    let regexMessage = /^.{1,255}$/;

    if (!formData.name.trim()) {
      errors.name = 'El campo "Nombre" no debe ser vacio.';
    } else if (!regexName.test(formData.name)) {
      errors.name = 'El campo "Nombre" es incorrecto.';
    }

    if (!formData.email.trim()) {
      errors.email = 'El campo "Email" no debe ser vacio.';
    } else if (!regexEmail.test(formData.email)) {
      errors.email = 'El campo "Email" es incorrecto.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El campo "Celular" no debe ser vacio.';
    } else if (!regexPhone.test(formData.phone)) {
      errors.phone =
        'El campo "Celular" es incorrecto, no puede tener espacios en blanco y debe tener más de 5 caracteres';
    }

    if (!formData.message.trim()) {
      errors.message = 'El campo "Mensaje" no debe ser vacio.';
    } else if (!regexMessage.test(formData.message)) {
      errors.message = 'El campo "Mensaje" es incorrecto.';
    }
    return errors;
  };

  const err = onValidate(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(err);

    if (Object.keys(errors).length === 0) {
      try {
        setErrors('');
        const formDataToSend = { ...formData };
        setFormData(initialForm);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Mensaje Enviado',
          showConfirmButton: false,
          timer: 1000,
        });

        const body = {
          Hola: 'GymFit',
          Recibiste_un_mensaje_de: formDataToSend.name,
          Con_email: formDataToSend.email,
          Numero_celular: formDataToSend.phone,
          Mensaje: formDataToSend.message,
        };

        console.log(body);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h3 className={style.title}>¡Ponte en contacto con nosotros!</h3>

      <div className={`${style.row} ${style.rowLg}`}>
        <div className={`${style.inputGroup} ${style.inputGroupLg}`}>
          <label>Nombre</label>
          <input
            type="text"
            required
            className={style.input}
            name="name"
            placeholder=" Nombre y apellido"
            onChange={handleChange}
            value={formData.name}
          />
          {errors.name && <p className={style.error}>{errors.name}</p>}
        </div>

        <div className={`${style.inputGroup} ${style.inputGroupLg}`}>
          <label>Telefono</label>
          <input
            type="number"
            required
            className={style.input}
            name="phone"
            placeholder=" 303213..."
            onChange={handleChange}
            value={formData.phone}
          />
          {errors.phone && <p className={style.error}>{errors.phone}</p>}
        </div>
      </div>

      <div className={style.inputGroup}>
        <label>E-mail</label>
        <input
          type="email"
          required
          className={style.input}
          name="email"
          placeholder=" correo_electronico@gmail.com"
          onChange={handleChange}
          value={formData.email}
        />
        {errors.email && <p className={style.error}>{errors.email}</p>}
      </div>

      <div className={style.inputGroup}>
        <label>Mensaje</label>
        <textarea
          required
          className={style.input}
          name="message"
          placeholder=" Deseo mas información"
          onChange={handleChange}
          value={formData.message}
        />
        {errors.message && <p className={style.error}>{errors.message}</p>}
      </div>

      <div className={style.contButton}>
        <button className={style.button} type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default FormContact;
