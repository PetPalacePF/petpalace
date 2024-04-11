require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const listPaymentIntents = async () => {
    try {
        const paymentIntents = await stripe.paymentIntents.list({ limit: 10 });
        // Mapear los datos de cada pago para devolver solo los campos deseados
        const formattedPaymentIntents = paymentIntents.data.map(paymentIntent => ({
            stripe_payment_id: paymentIntent.id,
            stripe_payment_status: paymentIntent.status,
        }));
        
        return formattedPaymentIntents;
    } catch (error) {
        throw new Error('Error al obtener los pagos');
    }
};

module.exports = listPaymentIntents;