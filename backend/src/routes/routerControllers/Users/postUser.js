const createUser = require("../../../controllers/Users/createUser");
const nodemailer = require("nodemailer");

const postUser = async (req, res) => {
  const { email, name } = req.body;
  const email_message = `Para crear un usuario es necesario indicar un email.`;

  if (!email || email === "") {
    return res.status(400).json({ created: false, error: email_message });
  }

  const message = {
    from: "petpalacepf@gmail.com",
    to: email,
    subject: "Welcome to PetPalace",
    html: `<h1>Hello ${name}</h1>
    <img src="https://res.cloudinary.com/petpalacecloudinary/image/upload/v1712698455/Bienvenido_yin6dr.jpg"/>
    <h3>Welcome to PetPalace, feel free to review our product catalog like the professionals who are registered on our page to give your pets the best possible treatment 🐶😺 </h3>`,
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

  try {
    const { user, created } = await createUser(email, name);
    console.log(message);
    if (created) {
      await transporter.sendMail(message);
    }
    res.status(201).json({ created: created, user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
