import { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';

export const submitContactForm = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  try {
    // Send the email
    await sendEmail(
      process.env.CONTACT_EMAIL as string,
      `New Contact Form Submission from ${name}`,
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};