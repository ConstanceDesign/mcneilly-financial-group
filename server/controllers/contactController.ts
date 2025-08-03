import { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';
import axios from 'axios';

export const sendContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message, token } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: 'Missing required fields.' });
      return;
    }

    if (!token) {
      res.status(400).json({ success: false, message: 'Missing reCAPTCHA token.' });
      return;
    }

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: token,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!response.data.success) {
      res.status(403).json({ success: false, message: 'reCAPTCHA verification failed.' });
      return;
    }

    await sendEmail(
      process.env.CONTACT_EMAIL as string,
      `New Contact Form Submission from ${name}`,
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );

    console.log(`✅ Contact form received from ${email}`);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Error in contact form submission:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};