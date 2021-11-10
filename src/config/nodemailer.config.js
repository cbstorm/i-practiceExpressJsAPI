const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    },
});

exports.generateEmail = (receiver) => {
    const verifyCode = Math.random().toString().slice(-5);
    const mailOptions = {
        from: 'i-Practice Server <ipratices@gmail.com>',
        to: receiver,
        subject: `Xin chào,${receiver}. Email này được gửi từ hệ thống của i-Practice`,
        html: `<h1>Mã xác thực của bạn là:${verifyCode}</h1>`,
    };
    return { verifyCode, mailOptions };
};

exports.sendForgotPasswordEmail = async (mailOptions) => {
    try {
        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        throw error;
    }
};
