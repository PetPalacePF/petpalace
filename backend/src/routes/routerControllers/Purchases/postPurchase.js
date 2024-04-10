const createPurchase = require("../../../controllers/Purchases/createPurchase");
const formattedPurchase = require("../../../utils/formatted/formattedPurchase");

const postPurchase = async (req, res) => {
  const { orders, userId } = req.body;
  let { stripe_payment_id, stripe_payment_status } = req.body;

  if (
    !orders ||
    orders.length === 0 ||
    !userId ||
    !stripe_payment_id ||
    !stripe_payment_status
  ) {
    return res.status(400).json({
      created: false,
      message:
        "Para crear una Compra, debe tener todos los campos requeridos completos: Orden, id_usuario, stripe_payment_id, stripe_payment_status.",
    });
  }

  try {
    const newPurchase = await createPurchase(
      orders,
      userId,
      stripe_payment_id,
      stripe_payment_status
    );
    newPurchase.hasOwnProperty("id")
      ? res.status(201).json({ created: true, purchase: formattedPurchase(newPurchase) })
      : res
          .status(400)
          .json({ created: false, message: newPurchase.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postPurchase;
