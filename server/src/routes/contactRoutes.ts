import express, { Request, Response } from 'express';

const router = express.Router();

// Route for POST request
router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submitted:', { name, email, message });
  res.status(200).json({ success: true, message: 'Contact form received!' });

});

export default router;