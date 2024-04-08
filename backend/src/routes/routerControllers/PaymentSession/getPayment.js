const listPaymentIntents = require("../../../controllers/PaymentSession/listPaymentIntents");

const getPayment = async (req, res) => {
    try {
        const paymentIntents = await listPaymentIntents();
        res.status(200).json(paymentIntents);
    } catch (error) {
        console.error("Error al obtener los pagos: ", error);
        res.status(500).json({ error: "Error al obtener los pagos" });
    }
};

module.exports = getPayment