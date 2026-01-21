import { Request, Response } from 'express';
import axios from 'axios';
import { sendEmail } from '../services/emailService';

export const sendContactMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, message, token } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
      return;
    }

    if (!token) {
      res.status(400).json({
        success: false,
        message: 'Missing reCAPTCHA token.',
      });
      return;
    }

    // Verify reCAPTCHA
    const captchaResponse = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || '',
        response: token,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!captchaResponse.data.success) {
      res.status(403).json({
        success: false,
        message: 'reCAPTCHA verification failed.',
      });
      return;
    }

    // Determine destination email safely
    const to =
      process.env.CONTACT_EMAIL ||
      process.env.EMAIL_RECEIVER ||
      process.env.SMTP_USER;

    if (!to) {
      res.status(500).json({
        success: false,
        message: 'Contact email destination is not configured.',
      });
      return;
    }

    // Send email
    await sendEmail(
      to,
      `New Contact Form Submission from ${name}`,
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    console.log(`✅ Contact form received from ${email}`);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('❌ Error in contact form submission:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};