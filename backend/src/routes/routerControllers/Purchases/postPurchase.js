const createPurchase = require("../../../controllers/Purchases/createPurchase");
const formattedPurchase = require("../../../utils/formatted/formattedPurchase");
const nodemailer = require("nodemailer");
const { Purchase, User } = require("../../../db"); // Importa los modelos Purchase y User

const postPurchase = async (req, res) => {
  const { orders, userId } = req.body;
  let { stripe_payment_id, stripe_payment_status } = req.body;

  // console.log({ orders, userId, stripe_payment_id, stripe_payment_status });

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

    if (!newPurchase.hasOwnProperty("id")) {
      return res
        .status(400)
        .json({ created: false, message: newPurchase.message });
    }

    // Busca la compra recién creada con el usuario asociado incluido
    const purchaseWithUser = await Purchase.findOne({
      where: { id: newPurchase.id },
      include: { model: User },
    });

    if (!purchaseWithUser) {
      return res
        .status(404)
        .json({ created: false, message: "Compra no encontrada" });
    }

    const userEmail = purchaseWithUser.User.email; // Obtiene el correo electrónico del usuario asociado a la compra

    const emailMessage = {
      from: "petpalacepf@gmail.com",
      to: userEmail,
      subject: "Confirmación de Compra en PetPalace",
      html: `<h1>Hola</h1>
      <h2>Tu compra en PetPalace ha sido realizada con éxito.</h2>
      <h3>¡Gracias por elegir PetPalace!</h3>`,
    };

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "petpalacepf@gmail.com",
        pass: "emvouodkhkpilkti",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail(emailMessage); // Envía el correo electrónico de confirmación

    res
      .status(201)
      .json({ created: true, purchase: formattedPurchase(newPurchase) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postPurchase;
