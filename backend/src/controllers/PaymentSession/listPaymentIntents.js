require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const listPaymentIntents = async () => {
    try {
        const paymentIntents = await stripe.paymentIntents.list({ limit: 10 });
        // Mapear los datos de cada pago para devolver solo los campos deseados
        const formattedPaymentIntents = paymentIntents.data.map(paymentIntent => ({
            id: paymentIntent.id,
            object: paymentIntent.object,
            amount: paymentIntent.amount,
            canceled_at: paymentIntent.canceled_at,
            cancellation_reason: paymentIntent.cancellation_reason,
            status: paymentIntent.status,
            processing: paymentIntent.processing,
            receipt_email: paymentIntent.receipt_email
        }));
        return formattedPaymentIntents;
    } catch (error) {
        throw new Error('Error al obtener los pagos');
    }
};

module.exports = listPaymentIntents;