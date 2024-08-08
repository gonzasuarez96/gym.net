import React, { useEffect, useState } from 'react';
import useScript from '../hooks/useScript';
import { formConfig } from './formConfig';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styles from './mercadoPagoForm.module.css';
import axios from 'axios';
import { urlProduction } from '../utils/data';
import { displayFailedMessage, displaySuccessMessage } from '../utils/toastyfy';
import { ToastContainer } from 'react-toastify';

const INITIAL_STATE = {
  cvc: '',
  cardExpirationMonth: '',
  cardExpirationYear: '',
  focus: 'cardNumber',
  cardholderName: '',
  cardNumber: '',
  issuer: '',
};

export default function MercadoPagoForm() {
  const [state, setState] = useState(INITIAL_STATE);
  const [resultPayment, setResultPayment] = useState(null);
  const [user, setUser] = useState(null);
  const { MercadoPago } = useScript(
    'https://sdk.mercadopago.com/js/v2',
    'MercadoPago'
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log('user:',user?.id)
    if (MercadoPago) {
      const mp = new MercadoPago(import.meta.env.VITE_PUBLIC_KEY_MP);
      const cardForm = mp.cardForm({
        amount: '100.5',
        autoMount: true,
        form: formConfig,
        callbacks: {
          onFormMounted: (error) => {
            if (error)
              return console.warn('Form Mounted handling error: ', error);
          },
          onIssuersReceived: (error, issuers) => {
            console.log('hello', issuers);
            if (error) return console.warn('issuers handling error: ', error);
          },
          onSubmit: async (event) => {
            event.preventDefault();

            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData();

            try {
              const response = await axios.post(
                `${urlProduction}/payment`,
                {
                  token,
                  issuer_id,
                  payment_method_id,
                  transaction_amount: 1000,
                  installments: Number(installments),
                  description: 'Descripción del producto',
                  payer: {
                    email,
                    identification: {
                      type: identificationType,
                      number: identificationNumber,
                    },
                  },
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
              setResultPayment(response.data);
            } catch (err) {
              setResultPayment(err);
            }
          },
          onFetching: (resource) => {
            const progressBar = document.querySelector(
              `.${styles.progressBar}`
            );
            progressBar.removeAttribute('value');

            return () => {
              progressBar.setAttribute('value', '0');
            };
          },
        },
      });
    }
  }, [MercadoPago]);

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken)
    const send = { suscripted: true };
    try {
      const response = await axios.put(
        `${urlProduction}/users/${user.id}`,
        send,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      displaySuccessMessage("Se ha acreditado tu suscripcion.")
      setTimeout(() => {
        window.location.href = '/';
      }, 2000); 
    } catch (error) {
      displaySuccessMessage("Se ha acreditado tu suscripcion.")
      setTimeout(() => {
        window.location.href = '/';
      }, 2000); 
    }
  };

  return (
    <div className={styles.formContainer}>
      <Card
        cvc={state.cvc}
        expiry={state.cardExpirationMonth + state.cardExpirationYear}
        name={state.cardholderName}
        number={state.cardNumber}
        focused={state.focus}
        brand={state.issuer}
      />

      <form id="form-checkout" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.column}>
            <input
              type="tel"
              name="cardNumber"
              placeholder="Número de tarjeta"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className={styles.input}
            />
            <input
              type="tel"
              name="cardExpirationMonth"
              placeholder="Mes de expiración"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className={styles.input}
            />
            <input
              type="tel"
              name="cardExpirationYear"
              placeholder="Año de expiración"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className={styles.input}
            />
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className={styles.input}
            />
            <p className={styles.p}>TOTAL: $ 100</p>
          </div>
          <div className={styles.column}>
            <input
              type="text"
              name="cardholderName"
              placeholder="Nombre del titular"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className={styles.input}
            />
            <input
              type="email"
              name="cardholderEmail"
              placeholder="Email del titular"
              onFocus={handleInputFocus}
              className={styles.input}
            />
            <select
              name="issuer"
              id="form-checkout__issuer"
              className={styles.select}
            >
              <option value="">Selecciona el emisor</option>
              {/* Opciones de emisores */}
            </select>
            <select
              name="identificationType"
              id="form-checkout__identificationType"
              className={styles.select}
            >
              <option value="">Tipo de identificación</option>
              {/* Opciones de identificación */}
            </select>
            <input
              type="text"
              name="identificationNumber"
              placeholder="Número de identificación"
              className={styles.input}
            />
            <button type="submit" className={styles.submitButton}>
              Pagar
            </button>
          </div>
        </div>
        <progress value="0" className={styles.progressBar}>
          Cargando...
        </progress>
      </form>
      {resultPayment && (
        <p className={styles.result}>{JSON.stringify(resultPayment)}</p>
      )}
      <ToastContainer />
    </div>
  );
}
