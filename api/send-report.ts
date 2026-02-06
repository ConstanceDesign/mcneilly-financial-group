import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

type ApiOk = { ok: true; message: string };
type ApiErr = { ok: false; code: string; message: string };

const ok = (res: VercelResponse, message: string) =>
  res.status(200).json({ ok: true, message } satisfies ApiOk);

const fail = (res: VercelResponse, status: number, code: string, message: string) =>
  res.status(status).json({ ok: false, code, message } satisfies ApiErr);

const isEmail = (v?: string) => !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clamp = (s: string, n: number) => (s.length > n ? s.slice(0, n) : s);

const buckets = new Map<string, { count: number; resetAt: number }>();
function rateLimit(key: string, limit = 8, windowMs = 10 * 60_000) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }
  if (b.count >= limit) return { allowed: false };
  b.count += 1;
  return { allowed: true };
}

function getIp(req: VercelRequest) {
  const xf = req.headers['x-forwarded-for'];
  const ip =
    (typeof xf === 'string' ? xf : Array.isArray(xf) ? xf[0] : '')?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  return ip;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function makeTransporter() {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, ''); // ✅ remove spaces

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

async function sendWithRetry(send: () => Promise<void>) {
  try {
    await send();
    return;
  } catch (err: any) {
    const code = String(err?.code || '');
    if (code === 'EBUSY' || code === 'EAI_AGAIN' || code === 'ENOTFOUND') {
      await sleep(350);
      await send();
      return;
    }
    throw err;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return fail(res, 405, 'METHOD_NOT_ALLOWED', 'Method not allowed');

  const ip = getIp(req);
  const rl = rateLimit(`report:${ip}`, 8, 10 * 60_000);
  if (!rl.allowed) {
    return fail(res, 429, 'RATE_LIMITED', 'Too many requests. Please try again in 10 minutes.');
  }

  try {
    const { pdfBase64, email, subject, meta } = (req.body ?? {}) as {
      pdfBase64?: string;
      email?: string;
      subject?: string;
      meta?: Record<string, any>;
    };

    const to = (email || process.env.EMAIL_TO || '').trim();
    if (!isEmail(to)) return fail(res, 400, 'BAD_EMAIL', 'Please enter a valid email address.');

    if (!pdfBase64 || typeof pdfBase64 !== 'string' || !pdfBase64.includes(',')) {
      return fail(res, 400, 'MISSING_PDF', 'Could not attach the PDF. Please try again.');
    }

    const createdAtUTC = new Date().toISOString();
    const userAgent = String(req.headers['user-agent'] || '');

    const m = meta || {};
    const title = String(m.reportTitle || 'Investment Projection Report');
    const preparedFor = String(m.preparedFor || '');
    const accountType = String(m.accountType || '');

    const body =
`REPORT REQUEST
DATE (UTC): ${createdAtUTC}
PREPARED FOR: ${clamp(preparedFor, 120)}
EMAIL: ${clamp(to, 160)}
ACCOUNT TYPE: ${clamp(accountType, 60)}
INCOME: ${clamp(String(m.income || ''), 40)}
STARTING: ${clamp(String(m.startingAmount || ''), 40)}
MONTHLY: ${clamp(String(m.monthlyContribution || ''), 40)}
RETURN: ${clamp(String(m.annualReturnRate || ''), 40)}
YEARS: ${clamp(String(m.yearsToGrow || ''), 10)}
INFLATION ADJUSTED: ${m.inflationAdjusted ? 'Yes (2%/yr)' : 'No'}
PROJECTED VALUE: ${clamp(String(m.projectedValue || ''), 200)}

TECH
IP: ${ip}
UA: ${userAgent}
`;

    const transporter = makeTransporter();

    await sendWithRetry(() =>
      transporter.sendMail({
        from: (process.env.EMAIL_FROM || '').trim(),
        to,
        subject: subject ? clamp(subject, 120) : title,
        text: body,
        attachments: [
          {
            filename: 'investment-report.pdf',
            content: pdfBase64.split(',')[1],
            encoding: 'base64',
          },
        ],
      }).then(() => undefined)
    );

    return ok(res, 'Email sent! Please check your inbox.');
  } catch (err) {
    console.error('Send report error:', err);
    return fail(res, 500, 'EMAIL_SEND_FAILED', 'Email failed to send. Please try again in a moment.');
  }
}