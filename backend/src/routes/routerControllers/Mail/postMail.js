const nodemailer = require('nodemailer');

const postMail = async (req, res) => {
    const { userEmail, userMessage, userName } = req.body;

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

    const mailOptions = {
        from: 'petpalacepf@gmail.com',
        to: userEmail,
        subject: 'Confirmation of receipt of message',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="https://res.cloudinary.com/petpalacecloudinary/image/upload/v1713202994/mailC_gdtftr.png" alt="PetPalace" style="display: block; margin: auto; max-width: 200px;">
        <h1>Hello, ${userName}🙋‍♂️🐶😺</h1>
        <p style="font-size: 16px; text-align: center;">We confirm that your email has been received correctly.</p>
        <p style="font-size: 16px; background-color: #f2f2f2;"><strong>Your message:</strong> ${userMessage}</p>
        <p style="font-size: 16px; text-align: center;">We will review your message and respond to you as quickly as possible.</p>
        </div>
        <img src="https://res.cloudinary.com/petpalacecloudinary/image/upload/v1713191495/ContactConfirmation_hjyshp.jpg" alt="PetPalace" style="display: block; margin: auto; max-width: 300px;">
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending confirmation email:', error);
            res.status(500).json({ error: 'Error sending confirmation email' });
        } else {
            console.log('Confirmation email sent successfully:', info.response);
            res.status(200).json({ message: 'Confirmation email sent successfully' });
        }
    });
};

module.exports = postMail;