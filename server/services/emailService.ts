const nodemailer = require('nodemailer')
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
};

// 🆕 financial calculator report
export const sendFinancialReportEmail = async (clientName: string, summary: string) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.EMAIL_RECEIVER || process.env.SMTP_USER,
    subject: `Investment Summary for ${clientName}`,
    text: `Hello,

Here is the investment summary for ${clientName}:

${summary || 'No summary provided.'}

— McNeilly Financial Group`
  };

  await transporter.sendMail(mailOptions);
};