import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

if (!SMTP_USER || !SMTP_PASS) {
  // Don’t crash hard in production builds, but make it obvious in dev
  // eslint-disable-next-line no-console
  console.warn('⚠️ Missing SMTP_USER or SMTP_PASS in environment variables.');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

transporter.verify((err) => {
  if (err) console.error('❌ SMTP verify failed:', err);
  else console.log('✅ SMTP server is ready to send mail');
});

/** Generic email helper (used by contact form) */
export const sendEmail = async (to: string, subject: string, text: string) => {
  if (!SMTP_USER) throw new Error('SMTP_USER is not set');

  await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject,
    text,
  });
};

/** Contact form email (sends to CONTACT_EMAIL or fallback EMAIL_RECEIVER) */
export const sendContactEmail = async (opts: {
  name: string;
  email: string;
  message: string;
  phone?: string;
}) => {
  const to = process.env.CONTACT_EMAIL || process.env.EMAIL_RECEIVER || SMTP_USER;
  if (!to) throw new Error('No contact destination email configured (CONTACT_EMAIL / EMAIL_RECEIVER).');
  if (!SMTP_USER) throw new Error('SMTP_USER is not set');

  const subject = `New website inquiry — ${opts.name}`;
  const text = [
    `Name: ${opts.name}`,
    `Email: ${opts.email}`,
    opts.phone ? `Phone: ${opts.phone}` : null,
    '',
    'Message:',
    opts.message,
  ]
    .filter(Boolean)
    .join('\n');

  await transporter.sendMail({
    from: SMTP_USER,
    to,
    replyTo: opts.email, // ✅ makes replying easy
    subject,
    text,
  });
};

/** Financial calculator email with optional PDF attachment */
export const sendFinancialReportEmail = async (
  clientName: string,
  summary: string,
  pdfBase64?: string
) => {
  const to = process.env.EMAIL_RECEIVER || SMTP_USER;
  if (!to) throw new Error('No report destination email configured (EMAIL_RECEIVER or SMTP_USER).');
  if (!SMTP_USER) throw new Error('SMTP_USER is not set');

  const attachments =
    pdfBase64 && pdfBase64.includes(',')
      ? [
          {
            filename: `Investment_Report_${String(clientName || 'Client')
              .trim()
              .replace(/\s+/g, '_')}.pdf`,
            content: pdfBase64.split(',')[1], // remove data:... prefix
            encoding: 'base64',
            contentType: 'application/pdf',
          },
        ]
      : [];

  await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject: `Investment Summary for ${clientName || 'Client'}`,
    text: `Hello,

Here is the investment summary for ${clientName || 'Client'}:

${summary || 'No summary provided.'}

— McNeilly Financial Group`,
    attachments,
  });
};