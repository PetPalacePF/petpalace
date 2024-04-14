const createPaymentSession = require("../../../controllers/PaymentSession/createPaymentSession")

const postPaymentSession = async(req,res) =>{
<<<<<<< HEAD
  const {products, origin} = req.body;
  

    try {
        const session = await createPaymentSession(products,origin);
=======
  const {products, origin} = req.body

    try {
        const session = await createPaymentSession(products, origin);
>>>>>>> 47963d2b11c9ec7966c14b73f2a425bd681ab965
        res.status(200).json({ sessionId: session.id });
      } catch (error) {
        console.error('Error al crear la sesión de pago:', error);
        res.status(500).json({ error: 'Error al procesar el pago' });
      }
}


module.exports = postPaymentSession