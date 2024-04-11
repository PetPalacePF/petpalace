const createPayment = require("../../../controllers/PaymentSession/createPayment");

const getpaymentById = async (req, res) => {
    const paymentId = req.params.id;
console.log(paymentId)
    try {
        const paymentIntent = await createPayment(paymentId);
        res.status(200).json(paymentIntent);
    } catch (error) {
        console.error("Error al obtener el pago:", error);
        res.status(500).json({ error: "Error al obtener el pago" });
    }
};

module.exports = getpaymentById;