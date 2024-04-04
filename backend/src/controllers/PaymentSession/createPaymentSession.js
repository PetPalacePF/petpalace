const stripe = require('stripe')('sk_test_51P0rxH2NIYOIQA82xsJIavzHOKKcNHqT3fSJx4NYk5MlMvMfAu47zCpZNwVxMhYeqCsv930ezx5uPmzZmDlFPetW00891Fpxv3');
// const { Order, Product } = require ('../../db');

const createPaymentSession = async(products, userId) =>{
    try {

      const totalPrice = products.reduce((total, product) => {
        return total + product.price;
      }, 0);

        // Crear una nueva orden en tu base de datos
        //  const order = await Order.create({
        //  userId: userId,
        //   totalPrice: totalPrice,

        //  });
    
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
          quantity: 1,
        }));
    
        // Crear una nueva sesión de pago con Stripe
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: 'https://tudominio.com/pago-exitoso',
          cancel_url: 'https://tudominio.com/pago-cancelado',
        });
    
        return session;
      } catch (error) {
        throw new Error('Error al crear la sesión de pago');
      }
}


module.exports = createPaymentSession