const createPaymentSession = require("../../../controllers/PaymentSession/createPaymentSession")

const postPaymentSession = async(req,res) =>{
  const products = req.body.products;

    try {
        const session = await createPaymentSession(products);
        res.status(200).json({ sessionId: session.id });
      } catch (error) {
        console.error('Error al crear la sesión de pago:', error);
        res.status(500).json({ error: 'Error al procesar el pago' });
      }
}


module.exports = postPaymentSession