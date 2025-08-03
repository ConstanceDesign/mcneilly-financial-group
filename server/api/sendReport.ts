import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

interface ReportRequest {
  clientName: string;
  summary: string;
  chartData?: ChartData;
  pdfBase64?: string; 
}

router.post('/sendReport', async (req: Request<{}, {}, ReportRequest>, res: Response) => {
  const { clientName, summary, chartData, pdfBase64 } = req.body;

  if (!clientName || !summary) {
    return res.status(400).json({ error: 'Missing client name or summary' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const htmlBody = `
    <h2>Investment Report for ${clientName}</h2>
    <p>${summary}</p>
    ${chartData ? `
      <h3>Chart Data</h3>
      <pre>${JSON.stringify(chartData, null, 2)}</pre>
    ` : ''}
  `;

  const attachments = [];

  if (pdfBase64) {
    attachments.push({
      filename: `Investment_Report_${clientName.replace(/\s+/g, '_')}.pdf`,
      content: Buffer.from(pdfBase64.split(',')[1], 'base64'),
      encoding: 'base64',
    });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER!,
      subject: `Investment Report for ${clientName}`,
      html: htmlBody,
      attachments,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;