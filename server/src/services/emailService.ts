const nodemailer = require('nodemailer');
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: `"McNeilly Financial Group" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

transporter.verify((error: any, success: any) => {
  if (error) {
    console.error('SMTP verification error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'Loaded' : 'Missing');
console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);

export { sendEmail };