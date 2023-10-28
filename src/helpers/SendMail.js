import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendMail = async ({ from, to, subject, html }) => {
    try {
        const info = await transporter.sendMail({ from, to, subject, html });
        return { success: true, info: info };
    } catch (error) {
        return { success: false, error: error?.message };
    }
}

export default sendMail;