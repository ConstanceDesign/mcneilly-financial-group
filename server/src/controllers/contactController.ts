import { Request, Response } from 'express';

export const createContact = (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // Simulate a dummy response
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  return res.status(200).json({
    message: `Contact form submitted successfully. We received: ${name}, ${email}, ${message}`
  });
};