const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const { Product } = require("../../db");
const { FRONTEND_URL } = require("../../config");

const createPaymentSession = async (products, origin, customerEmail) => {
  try {
    // Verifica si hay suficiente cantidad disponible en el stock para cada producto
    const availabilityCheck = await Promise.all(
      products.map(async (product) => {
        const dbProduct = await Product.findByPk(product.id);
        if (!dbProduct) {
          throw new Error(`Product with id ${product.id} not found`);
        }
        if (product.quantity > dbProduct.stock) {
          return {
            status: false,
            product: dbProduct,
          };
        }
        return {
          status: true,
          product: dbProduct,
        };
      })
    );

    // Si algunos productos no tienen suficiente stock, genera un mensaje de error detallado
    const outOfStockProducts = availabilityCheck.filter(
      (item) => item.status === false
    );

    if (outOfStockProducts.length > 0) {
      const productNames = outOfStockProducts.map((item) => item.product.name);
      console.log(
        `Insufficient stock for the following products: ${productNames.join(
          ", "
        )}`
      );
      throw new Error(
        `Insufficient stock for the following products: ${productNames.join(
          ", "
        )}`
      );
    }

    // Crear un array de línea de artículos para la sesión de pago de Stripe
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.description,
          images: [product.img],
        },
        unit_amount: Math.round(product.price * 100), // El precio debe estar en centavos
      },
      quantity: product.cantidad, // Utiliza la cantidad proporcionada por el front-end
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerEmail,
      success_url: `${FRONTEND_URL}/cart/orderStatus`,
      cancel_url:
        origin === "Detail"
          ? `${FRONTEND_URL}/detail/${products[0].id}`
          : `${FRONTEND_URL}/cart/purchase`,
    });
    return session;
  } catch (error) {
    throw new Error("Error creating payment session:" + error.message);
  }
};

module.exports = createPaymentSession;
