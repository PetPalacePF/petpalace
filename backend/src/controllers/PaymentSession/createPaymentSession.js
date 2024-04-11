const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const {FRONTEND_URL} = require('../../config');

const createPaymentSession = async(products, userId) =>{
    try {

      const totalPrice = products.reduce((total, product) => {
        return total + product.price;
      }, 0);

         
        // Crear un array de línea de artículos para la sesión de pago de Stripe
        const lineItems = products.map(product => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.img],
            },
            unit_amount: Math.round(product.price * 100), // El precio debe estar en centavos
          },
          quantity: product.cantidad,
        }));
    
        // Crear una nueva sesión de pago con Stripe
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: `${FRONTEND_URL}`,
          cancel_url: 'https://tudominio.com/pago-cancelado',
        });
    
        return session;
      } catch (error) {
        throw new Error('Error al crear la sesión de pago');
      }
}


module.exports = createPaymentSession