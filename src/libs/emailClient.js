import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

export async function sendEmail(email, subject, text = "", html = "") {
    try {
        await transporter.sendMail({ to: email, subject, text, html, from: process.env.EMAIL_FROM });
    } catch (error) {
        console.error(error);
    }
}