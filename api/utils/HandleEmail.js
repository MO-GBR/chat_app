import env from "dotenv"
import nodemailer from 'nodemailer';

env.config();

export const SendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
            console.log(`Email could not be sent: ${err.message}`);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};