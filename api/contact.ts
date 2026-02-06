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
function rateLimit(key: string, limit = 6, windowMs = 10 * 60_000) {
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
    // ✅ one retry for transient DNS issues
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
  const rl = rateLimit(`contact:${ip}`, 6, 10 * 60_000);
  if (!rl.allowed) {
    return fail(res, 429, 'RATE_LIMITED', 'Too many requests. Please try again in 10 minutes.');
  }

  try {
    const { name, email, message, phone } = (req.body ?? {}) as {
      name?: string;
      email?: string;
      message?: string;
      phone?: string;
    };

    const safeName = (name || '').trim();
    const safeEmail = (email || '').trim();
    const safeMsg = (message || '').trim();
    const safePhone = (phone || '').trim();

    if (!safeName) return fail(res, 400, 'MISSING_NAME', 'Please enter your name.');
    if (!isEmail(safeEmail)) return fail(res, 400, 'BAD_EMAIL', 'Please enter a valid email address.');
    if (!safeMsg) return fail(res, 400, 'MISSING_MESSAGE', 'Please enter a message.');

    const createdAtUTC = new Date().toISOString();
    const userAgent = String(req.headers['user-agent'] || '');

    const subject = `[Website Lead] Contact Form — ${clamp(safeName, 80)}`;

    const text =
`LEAD SOURCE: Website Contact Form
DATE (UTC): ${createdAtUTC}
NAME: ${clamp(safeName, 120)}
EMAIL: ${clamp(safeEmail, 160)}
PHONE: ${clamp(safePhone, 60)}

MESSAGE:
${clamp(safeMsg, 5000)}

TECH
IP: ${ip}
UA: ${userAgent}
`;

    const transporter = makeTransporter();

    await sendWithRetry(() =>
      transporter.sendMail({
        from: (process.env.EMAIL_FROM || '').trim(),
        to: (process.env.EMAIL_TO || '').trim(),
        subject,
        replyTo: safeEmail,
        text,
      }).then(() => undefined)
    );

    return ok(res, 'Message sent! We’ll get back to you shortly.');
  } catch (err) {
    console.error('Contact error:', err);
    return fail(res, 500, 'EMAIL_SEND_FAILED', 'Message failed to send. Please try again in a moment.');
  }
}