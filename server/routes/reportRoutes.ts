import express from 'express';
import { sendFinancialReportEmail } from '../services/emailService';

const router = express.Router();

router.post('/send-report', async (req, res) => {
  const { clientName, summary } = req.body;

  try {
    await sendFinancialReportEmail(clientName, summary);
    res.json({ message: 'Email sent successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

export default router;