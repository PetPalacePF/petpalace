const nodemailer = require("nodemailer");

const postMail2 = async (req, res) => {
    const { userEmail, userName, userReview, userRating, productId } = req.body;

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

    const productImages = Array.isArray(productId) ? productId : [productId]; // Asegurarse de que productId sea un array

    // Función para generar las etiquetas de imagen HTML
    const generateImageTags = images => {
        return images.map(img => `<img src="${img}" alt="Product Image" style="max-width: 100px;">`).join('');
    };

    const generateStarRating = (rating) => {
        const yellowStar = '<span style="color: yellow;">★</span>';
        const stars = yellowStar.repeat(rating);
        return stars;
    };

    // Email para el usuario
    const userMailOptions = {
        from: 'petpalacepf@gmail.com',
        to: userEmail,
        subject: 'Confirmation of receipt of review',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <img src="https://res.cloudinary.com/petpalacecloudinary/image/upload/v1713220042/ReviewM_drvsel.png" alt="PetPalace" style="display: block; margin: auto; max-width: 200px;">
            <h1>Hello, ${userName}🙋‍♂️🐶😺</h1>
            <p style="font-size: 16px; text-align: center;">We confirm that your review has been posted successfully.</p>
            <div style="background-color: #d0bcd5; padding: 20px; box-shadow: 0 0px 20px rgba(0, 0, 0, 0.5); border-radius: 10px; border: 10px solid #f2f2f2;">
                <p style="font-size: 16px; background-color: #969494;"><strong>Your review:</strong> ${userReview}</p>
                <p style="font-size: 16px; background-color: #969494;"><strong>Rating:</strong> ${generateStarRating(userRating)}</p>
                <div style="text-align: center;">
                    ${generateImageTags(productImages)}
                </div>
            </div>
            <p style="font-size: 16px; text-align: center;">🐾Thank you for your review. That helps us to improve and make PetPalace a better place for all pets!🐾.</p>
            <img src="https://res.cloudinary.com/petpalacecloudinary/image/upload/v1713220109/Review_evrbcy.jpg" alt="PetPalace" style="display: block; margin: auto; max-width: 400px;">
        </div>
        `,
    };

    // Email para PetPalace
    const petPalaceMailOptions = {
        from: 'petpalacepf@gmail.com',
        to: 'petpalacepf@gmail.com', 
        subject: 'New Review Posted',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <img src="https://res.cloudinary.com/petpalacecloudinary/image/upload/v1713220042/ReviewM_drvsel.png" alt="PetPalace" style="display: block; margin: auto; max-width: 200px;">
            <h1>New Review Posted from ${userName}</h1>
            <div style="background-color: #d0bcd5; padding: 20px; box-shadow: 0 0px 20px rgba(0, 0, 0, 0.5); border-radius: 10px; border: 10px solid #f2f2f2;">
                <p style="font-size: 16px; background-color: #969494;"><strong>User Email:</strong> ${userEmail}</p>
                <p style="font-size: 16px; background-color: #969494;"><strong>Review:</strong> ${userReview}</p>
                <p style="font-size: 16px; background-color: #969494;"><strong>Rating:</strong> ${generateStarRating(userRating)}</p>
                <p style="font-size: 16px; text-align: center;"> ${generateImageTags(productImages)}</p>
            </div>
        </div>
        `,
    };

    transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
            console.error('Error sending confirmation email to user:', error);
        } else {
            console.log('Confirmation email sent successfully to user:', info.response);
        }
    });

    transporter.sendMail(petPalaceMailOptions, (error, info) => {
        if (error) {
            console.error('Error sending notification email to PetPalace:', error);
            res.status(500).json({ error: 'Error sending notification email to PetPalace' });
        } else {
            console.log('Notification email sent successfully to PetPalace:', info.response);
        }
    });

    res.status(200).json({ message: 'Emails sent successfully' });
};

module.exports = postMail2;
