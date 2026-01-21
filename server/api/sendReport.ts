import express, { Request, Response } from 'express';
import { sendFinancialReportEmail } from '../services/emailService';

const router = express.Router();

type ReportRequestBody = {
  clientName?: string;
  summary?: string;
  pdfBase64?: string;
  chartData?: any; // optional; you’re not using it server-side right now
};

router.post('/send-report', async (req: Request<{}, {}, ReportRequestBody>, res: Response) => {
  const { clientName, summary, pdfBase64 } = req.body;

  if (!clientName || !summary) {
    return res.status(400).json({ message: 'Missing clientName or summary' });
  }

  try {
    await sendFinancialReportEmail(clientName, summary, pdfBase64);
    return res.json({ message: 'Email sent successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});