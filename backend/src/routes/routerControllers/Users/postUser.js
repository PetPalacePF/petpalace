const createUser = require("../../../controllers/Users/createUser");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");


const postUser = async (req, res) => {
  const { email, name } = req.body;
  const email_message = `Para crear un usuario es necesario indicar un email.`;

  if (!email || email === "") {
    return res.status(400).json({ created: false, error: email_message });
  }

  const htmlContent = fs.readFileSync(path.join(__dirname, "Welcome.html"), "utf8");

  const message = {
    from: "petpalacepf@gmail.com",
    to: email,
    subject: "Welcome to PetPalace",
    html: htmlContent,
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
    const { userWithOrder, created } = await createUser(email, name);
    if (created) {
      await transporter.sendMail(message);
    }
    res.status(201).json({ created: created, user: userWithOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
