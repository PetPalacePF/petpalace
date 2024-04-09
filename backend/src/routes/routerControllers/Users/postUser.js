const createUser = require("../../../controllers/Users/createUser");
const nodemailer = require("nodemailer");

const postUser = async (req, res) => {
  const { email, name } = req.body;
  //const message = `Para crear un usuario es necesario indicar un email.`

  if(!email || email === ""){
    return res.status(400).json({ user: null,  created: null, error: message });
  }
  const message = {
    from: 'petpalacepf@gmail.com',
    to: email,
    subject: 'Welcome to PetPalace',
    html: '<p>Buenos dias...</p>'
}

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user:'petpalacepf@gmail.com',
        pass:'emvouodkhkpilkti'
    }
})

  try {
    const {user, created} = await createUser(email, name);
    await transporter.sendMail(message)
    res.status(201).json({ user: user,  created: created});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
