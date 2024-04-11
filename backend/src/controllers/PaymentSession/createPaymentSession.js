const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const { Product } = require('../../db');

const createPaymentSession = async (products, userId) => {
    try {
        // Verifica si hay suficiente cantidad disponible en el stock para cada producto
        const availabilityCheck = await Promise.all(products.map(async (product) => {
            const dbProduct = await Product.findByPk(product.id);
            if (!dbProduct) {
                throw new Error(`Product with id ${product.id} not found`);
            }
            if (product.quantity > dbProduct.stock) {
              return {
                status: false,
                product: dbProduct
              };
            }
            return { 
              status: true,
              product: dbProduct
             };
          }));
        
        // Si algunos productos no tienen suficiente stock, genera un mensaje de error detallado
        const outOfStockProducts = availabilityCheck.filter(item => item.status === false);

        if (outOfStockProducts.length > 0) {
          const productNames = outOfStockProducts.map(item => item.product.name);
          console.log(`Insufficient stock for the following products: ${productNames.join(', ')}`);
          throw new Error(`Insufficient stock for the following products: ${productNames.join(', ')}`);
        }

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
            quantity: 1//product.quantity, // Utiliza la cantidad proporcionada por el front-end
        }));

       const session = await stripe.checkout.sessions.create({
           payment_method_types: ['card'],
           line_items: lineItems,
           mode:'payment',
           success_url:'http://localhost:5173/shop',
           cancel_url:'http://localhost:5173/shop'
       });

       return session;

    } catch (error){
      throw new Error('Error creating payment session:' + error.message);
    }
}

module.exports=createPaymentSession;