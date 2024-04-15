const createPurchase = require("../../../controllers/Purchases/createPurchase");
const formattedPurchase = require("../../../utils/formatted/formattedPurchase");
const nodemailer = require("nodemailer");
const { Purchase, User, Order, Product, Order_Product } = require("../../../db");


const buildEmailBody = async (purchase) => {
  let totalPrice = 0;
  let emailBody = `
    <html>
      <head>
        <style>
          /* Estilos CSS */
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 16px; /* Tamaño de texto más grande para la tabla */
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 12px; /* Aumenta el espacio entre el texto y los bordes */
          }
          th {
            background-color: #d8bfd8; /* Morado más claro para los encabezados */
            color: #000000; /* Texto negro para los encabezados */
          }
          .product-img {
            width: 50px; /* Tamaño original de las imágenes */
            height: auto;
          }
          .total-price {
            font-weight: bold;
            border-top: 2px solid #d8bfd8; /* Línea divisoria morada más clara para el total price */
            padding-top: 12px; /* Añade espacio superior al total price */
          }
          /* Textos centralizados */
          h1, h2, h3 {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>🐾PetPalace🐾</h1>
        <img src="https://res.cloudinary.com/petpalacecloudinary/image/upload/v1713049537/Compra_harhl2.png" alt="PetPalace" style="display: block; margin: auto; max-width: 200px;"> <!-- Ajuste del tamaño de la imagen -->
        <h1>Thank you for your purchase</h1>
        <h2>Here is your receipt:</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
  `;

  try {
    const orders = await Order.findAll({ 
      where: { PurchaseId: purchase.id }, 
      include: [{
        model: Product,
        attributes: ["id", "brand", "name", "price", "stock", "img"],
        through: {
          attributes: ["cantidad"],
        },
      }] 
    });
    
    orders.forEach(order => {
      const products = order.Products;

      products.forEach(product => {
        const productTotalPrice = product.price * product.Order_Product.cantidad;
        totalPrice += productTotalPrice;

        // Agrega la fila de la tabla con el nombre, cantidad, precio y la imagen del producto
        emailBody += `
          <tr>
            <td>${product.name}</td>
            <td>${product.Order_Product.cantidad}</td>
            <td>$${productTotalPrice}</td>
            <td><img src="${product.img}" alt="${product.name}" class="product-img"></td>
          </tr>
        `;
      });
    });

    // Agrega la fila del total price
    emailBody += `
          <tr class="total-price">
            <td colspan="3">Total Price</td>
            <td>$${totalPrice}</td>
          </tr>
        </tbody>
      </table>
      <h2>Thank you for choosing PetPalace. We hope to see you soon!</h2>
      <img src="https://res.cloudinary.com/petpalacecloudinary/image/upload/v1713049750/Purcharse_tytqml.webp" alt="PetPalace" style="display: block; margin: auto; max-width: 300px;"> <!-- Ajuste del tamaño de la imagen -->
    </body>
  </html>
  `;

    return emailBody;
  } catch (error) {
    // Manejar el error si ocurre una excepción al obtener las órdenes
    console.error("Error fetching orders:", error);
    return ""; // Devolver una cadena vacía en caso de error
  }
};




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

    const emailBody = await buildEmailBody(newPurchase);

    const emailMessage = {
      from: "petpalacepf@gmail.com",
      to: userEmail,
      subject: "Purchase Confirmation at PetPalace",
      html: emailBody,
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

    res.status(201).json({ created: true, purchase: newPurchase });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postPurchase;
