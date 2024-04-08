const createPurchase = require("../../../controllers/Purchases/createPurchase");

const postPurchase = async (req, res) => {
  const { orders, userId } = req.body;
  let { stripe_payment_id, stripe_payment_status } = req.body;
 
  if (!orders || orders.length === 0 || !userId || !stripe_payment_id || !stripe_payment_status ) {
    !(stripe_payment_id) && (stripe_payment_id = null)
    !(stripe_payment_status) && (stripe_payment_status = null)
    return res.status(500).json({
      error:
        "Para crear una Compra, debe tener todos los campos requeridos completos: Orden, id_usuario, stripe_payment_id, stripe_payment_status.",
        orders : orders,
        userId: userId,
        stripe_payment_id: stripe_payment_id, 
        stripe_payment_status: stripe_payment_status
    });
  }

  try {
    const newPurchase = await createPurchase( orders, userId, stripe_payment_id, stripe_payment_status );
    newPurchase.hasOwnProperty("UserId")
    ? res.status(201).json({newPurchase: newPurchase})
    : res.status(500).send(newPurchase.message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postPurchase;
