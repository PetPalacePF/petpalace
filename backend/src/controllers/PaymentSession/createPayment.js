require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPayment = async (paymentId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentId, {
            expand: ['payment_method', 'payment_method.billing_details']
        });
        
        // Extraer la información adicional que necesitas del objeto paymentIntent y su método de pago asociado
        const paymentMethod = paymentIntent.payment_method;
        const billingDetails = paymentMethod.billing_details;

        return {
            id: paymentIntent.id,
            object: paymentIntent.object,
            amount: paymentIntent.amount,
            canceled_at: paymentIntent.canceled_at,
            cancellation_reason: paymentIntent.cancellation_reason,
            billing_details: {
                address: {
                    city: billingDetails.address.city,
                    country: billingDetails.address.country,
                    line1: billingDetails.address.line1,
                    line2: billingDetails.address.line2,
                    postal_code: billingDetails.address.postal_code,
                    state: billingDetails.address.state
                },
                email: billingDetails.email,
                name: billingDetails.name,
                phone: billingDetails.phone,
                last4: paymentMethod.card.last4
            },
            status: paymentIntent.status,
            processing: paymentIntent.processing,
            receipt_email: paymentIntent.receipt_email,
            created: paymentIntent.created,
            shipping: paymentIntent.shipping
        };

    } catch (error) {
        console.error("Error al obtener el pago:", error);
        throw new Error('Error al obtener el pago');
    }
};

module.exports = createPayment;