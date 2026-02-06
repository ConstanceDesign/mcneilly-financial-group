import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, pdfBase64 } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your Investment Projection Report',
      text: 'Attached is your requested investment projection.',
      attachments: [
        {
          filename: 'investment-report.pdf',
          content: pdfBase64.split(',')[1],
          encoding: 'base64',
        },
      ],
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Report email error:', err);
    return res.status(500).json({ error: 'Email failed' });
  }
}