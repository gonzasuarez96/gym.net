// config/mercadoPago.ts
import mercadopago from 'mercadopago';

const mercadoPagoAccessToken = process.env.MERCADO_PAGO_SAMPLE_ACCESS_TOKEN;

if (!mercadoPagoAccessToken) {
    console.error('Access token not defined');
    process.exit(1);
}

// Inicializar el SDK con el access token
const mp = new mercadopago({
    accessToken: mercadoPagoAccessToken,
});

export default mp;
