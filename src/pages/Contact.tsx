import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion, useReducedMotion } from 'framer-motion';
import { FaEnvelope, FaUndo, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import heroDesktop from '../images/contact-hero-desktop.jpg';
import heroTablet from '../images/contact-hero-tablet.jpg';
import heroMobile from '../images/contact-hero-mobile.jpg';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

type FieldKey = 'name' | 'email' | 'phone' | 'message';
type FieldErrors = Partial<Record<FieldKey, string>>;

const Contact: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // v2 checkbox key
  const V2_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
  // v3 invisible key (preferred)
  const V3_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY as string | undefined;

  const isV3 = Boolean(V3_SITE_KEY);
  const isV2 = Boolean(V2_SITE_KEY);

  // ✅ Office contact (set these in .env for production)
  const OFFICE_EMAIL =
    (import.meta.env.VITE_OFFICE_EMAIL as string | undefined) || 'pmcneilly@sterlingmutuals.com';
  const OFFICE_FAX = (import.meta.env.VITE_OFFICE_FAX as string | undefined) || '(519) 979 5432';
  const OFFICE_PHONE = (import.meta.env.VITE_OFFICE_PHONE as string | undefined) || '(519) 979-5396';

  // tel: versions (mobile-friendly)
  const OFFICE_PHONE_TEL = '+15199795396';
  const OFFICE_FAX_TEL = '+15199795432';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const alertRef = useRef<HTMLDivElement>(null);

  // Focus-first-invalid
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: '2-digit' });
  }, []);

  const track = (event: string, params?: Record<string, any>) => {
    try {
      window.gtag?.('event', event, params || {});
    } catch {
      // no-op
    }
  };

  const ensureRecaptchaV3Script = async () => {
    if (!V3_SITE_KEY) return;
    if (window.grecaptcha) return;

    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-recaptcha-v3="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Failed to load reCAPTCHA')));
        return;
      }

      const s = document.createElement('script');
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(V3_SITE_KEY)}`;
      s.async = true;
      s.defer = true;
      s.setAttribute('data-recaptcha-v3', 'true');
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
      document.head.appendChild(s);
    });
  };

  const getV3Token = async () => {
    if (!V3_SITE_KEY) return null;
    await ensureRecaptchaV3Script();
    if (!window.grecaptcha) return null;

    return await new Promise<string | null>((resolve) => {
      window.grecaptcha!.ready(async () => {
        try {
          const token = await window.grecaptcha!.execute(V3_SITE_KEY, { action: 'contact_submit' });
          resolve(token);
        } catch {
          resolve(null);
        }
      });
    });
  };

  useEffect(() => {
    if (isV3) {
      ensureRecaptchaV3Script().catch(() => {
        // ignore; handled on submit
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isV3]);

  useEffect(() => {
    if (error) setTimeout(() => alertRef.current?.focus(), 0);
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as FieldKey;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);

    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

    setSubmitted(false);
  };

  const validate = () => {
    const errs: FieldErrors = {};

    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) errs.email = 'Please enter your email.';
    if (!formData.message.trim()) errs.message = 'Please enter a message.';

    const firstKey = (Object.keys(errs)[0] as FieldKey | undefined) || null;

    const focusFirst = () => {
      if (!firstKey) return;
      if (firstKey === 'name') nameRef.current?.focus();
      if (firstKey === 'email') emailRef.current?.focus();
      if (firstKey === 'phone') phoneRef.current?.focus();
      if (firstKey === 'message') messageRef.current?.focus();
    };

    return { errs, firstKey, focusFirst };
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setCaptchaToken(null);
    setError(null);
    setFieldErrors({});
    setSubmitted(false);
    track('contact_reset', { event_category: 'Contact', event_label: 'Reset' });

    setTimeout(() => nameRef.current?.focus(), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { errs, firstKey, focusFirst } = validate();
    if (firstKey) {
      setFieldErrors(errs);
      setError(errs[firstKey] || 'Please check the form.');
      track('contact_submit_error', { event_category: 'Contact', event_label: errs[firstKey] || 'validation_error' });
      setTimeout(() => focusFirst(), 0);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let tokenToSend: string | null = captchaToken;

      if (isV3) {
        tokenToSend = await getV3Token();
      } else if (isV2) {
        tokenToSend = captchaToken;
      }

      if (!tokenToSend) {
        const msg =
          isV3 || isV2
            ? 'Please complete reCAPTCHA before sending.'
            : 'reCAPTCHA is not configured. Set VITE_RECAPTCHA_V3_SITE_KEY (preferred) or VITE_RECAPTCHA_SITE_KEY.';
        setError(msg);
        return;
      }

      const res = await axios.post(`${API_BASE_URL}/api/contact`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
        token: tokenToSend,
      });

      if (res.data?.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setCaptchaToken(null);
        setFieldErrors({});

        track('form_submit', {
          event_category: 'Contact',
          event_label: 'Contact Form Submission',
        });

        setTimeout(() => alertRef.current?.focus(), 0);
      } else {
        setError('Unable to send your message. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Something went wrong. Please try again later.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Motion
  const reduceMotion = useReducedMotion();

  const cardIn = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, ease: 'easeOut' },
      };

  const colIn = (delay = 0) =>
    reduceMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.45, ease: 'easeOut', delay },
        };

  // 2026 surface system
  const pageBg = 'bg-[#f4f2ec]';

  // Slightly richer + more “premium” for 2026 (coordinated with hero wash)
  const softCard =
    'rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm ' +
    'shadow-[0_14px_42px_rgba(0,0,0,0.08)] ' +
    'p-5 sm:p-6 lg:p-7';

  const label = 'block text-[15px] font-semibold tracking-[0.01em] text-[#0f5028]';
  const input =
    'mt-1 w-full rounded-xs border border-black/20 bg-white/90 px-3 py-2.5 ' +
    'text-[16px] text-[#1f2937] placeholder:text-[#1f2937]/55 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25 ' +
    'focus-visible:border-[#0f5028]/25 ' +
    'focus-visible:shadow-[0_0_0_3px_rgba(47,122,46,0.08)]';

  const inputError = 'border-red-400 focus-visible:ring-red-200/60 focus-visible:border-red-300';

  const primaryBtn =
    'btn inline-flex items-center justify-center gap-2 ' +
    'w-full sm:w-auto ' +
    'px-5 py-3 rounded-xs ' +
    'bg-[#2f7a2e] hover:bg-[#3a8b34] ' +
    'text-white font-bold uppercase tracking-wide ' +
    'shadow-sm hover:shadow-md ' +
    'transition ' +
    'hover:shadow-[0_10px_22px_rgba(15,80,40,0.18)] ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  const secondaryBtn =
    'btn inline-flex items-center justify-center gap-2 ' +
    'w-full sm:w-auto ' +
    'px-4 py-3 rounded-xs ' +
    'bg-white/35 hover:bg-white/45 backdrop-blur-sm ' +
    'border border-black/10 ' +
    'text-[#2f7a2e] font-bold uppercase tracking-wide ' +
    'shadow-none hover:shadow-sm ' +
    'transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25';

  // Secondary map buttons
  const mapBtn =
    'btn inline-flex items-center justify-center gap-2 w-full ' +
    'px-5 py-3.5 rounded-xs ' +
    'bg-white/50 hover:bg-white/60 backdrop-blur-sm ' +
    'border border-[#2f7a2e]/30 hover:border-[#2f7a2e]/45 ' +
    'text-[#0f5028] font-bold uppercase tracking-wide ' +
    'shadow-sm hover:shadow-md transition ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25';

  const destinationEncoded = '1608%20Sylvestre%20Dr%20%232D%2C%20Tecumseh%2C%20ON%20N8N%202L9';
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationEncoded}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${destinationEncoded}`;

  return (
    <div className={`min-h-screen ${pageBg} text-[#1f2937] font-inter`}>
      {/* HERO — Desktop locked; Tablet/Mobile art direction + premium rhythm */}
      <section aria-label="Contact page hero" className="relative">
        <div className="relative overflow-hidden">
          <picture>
            <source media="(max-width: 640px)" srcSet={heroMobile} />
            <source media="(max-width: 1024px)" srcSet={heroTablet} />
            <img
              src={heroDesktop}
              alt="A warm conversation across generations"
              className="
                w-full
                h-[clamp(250px,62vw,360px)]
                sm:h-[clamp(280px,36vw,420px)]
                lg:h-[clamp(280px,28vw,420px)]
                object-cover
                object-[72%_30%]
                sm:object-[70%_34%]
                lg:object-[74%_36%]
                xl:object-[78%_34%]
                saturate-[0.98]
                contrast-[1.02]
              "
              loading="eager"
              decoding="async"
            />
          </picture>

          {/* Premium wash: strong left readability + softer right falloff */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,242,236,0.96),rgba(244,242,236,0.84),rgba(15,80,40,0.08))]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(0,0,0,0.12),transparent_56%)]"
          />

          {/* Subtle top vignette so hero “tucks under” the nav nicely */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.14),transparent)]"
          />

          {/* Content */}
          <div className="absolute inset-0">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
              <div className="h-full flex items-center">
                {/* Mobile gets a soft “glass” pad so text never fights the image */}
                <div className="relative -translate-y-3 sm:-translate-y-6 lg:-translate-y-4">
                  <div className="rounded-2xl bg-white/35 backdrop-blur-sm border border-black/5 px-4 py-4 sm:p-0 sm:bg-transparent sm:backdrop-blur-0 sm:border-0">
                    <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#0f5028]">
                      Consultation • Planning • Protection
                    </p>

                    <h1 className="mt-2.5 sm:mt-3 font-sans font-medium tracking-tight text-[#102019] leading-[1.05] text-[2.05rem] sm:text-5xl lg:text-6xl">
                      Let&apos;s Talk About
                      <br />
                      <span className="whitespace-nowrap">Your Financial Plan</span>
                    </h1>

                    <p className="mt-3 text-[16px] sm:text-[16px] text-[#1f2937]/80 leading-relaxed max-w-[44ch]">
                      Clear, conservative guidance for retirement, insurance,
                      <br className="hidden sm:block" />
                      and long-term planning — in person or virtually.
                    </p>

                    <a
                      href="#main-content"
                      className="sr-only focus:not-sr-only focus:inline-flex focus:mt-4 focus:bg-white/85 focus:px-3 focus:py-2 focus:rounded-xs focus:outline-none focus:ring-2 focus:ring-[#0f5028]/30"
                    >
                      Skip to main content
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Soft fade into the panel area */}
        <div className="h-10 sm:h-12 bg-[linear-gradient(to_bottom,rgba(244,242,236,0.0),rgba(244,242,236,1))]" />
      </section>

      {/* MAIN: surface panel overlap */}
      <main id="main-content" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-14">
        <div
          className="
            -mt-9 sm:-mt-14 lg:-mt-20
            rounded-[22px]
            border border-black/10
            bg-white/78
            backdrop-blur-md
            shadow-[0_22px_70px_rgba(0,0,0,0.10)]
            p-4 sm:p-6 lg:p-8
          "
        >
          <div className="grid gap-6 sm:gap-7 xl:gap-9 xl:grid-cols-12 items-start">
            {/* LEFT: FORM */}
            <motion.section {...(cardIn || {})} className={`${softCard} xl:col-span-7`}>
              <motion.div {...(colIn(0) || {})}>
                <header>
                  <h2 className="mt-0.5 font-sans text-[1.55rem] sm:text-2xl font-semibold tracking-tight text-[#0f5028]">
                    Start a conversation
                  </h2>
                  <p className="mt-1.5 text-[15px] text-[#1f2937]/65">
                    We reply personally within one business day.
                  </p>
                </header>

                <div className="mt-4 h-px w-full bg-black/10" />
              </motion.div>

              {(error || submitted) && (
                <div
                  ref={alertRef}
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  className={`mt-4 rounded-xl border p-4 outline-none ${
                    error
                      ? 'border-red-300 bg-red-50 text-red-800'
                      : 'border-[#0f5028]/25 bg-white/70 text-[#0f5028]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <FaCheckCircle
                      className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-[#2f7a2e]'}`}
                      aria-hidden="true"
                    />
                    <div className="text-sm md:text-base font-medium leading-relaxed">
                      {error ? error : 'Thank you — your message has been sent.'}
                    </div>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="mt-5">
                  <div className="rounded-xl border border-[#0f5028]/20 bg-white/70 p-4">
                    <p className="text-[#0f5028] font-semibold">Message sent.</p>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleReset}
                        className={secondaryBtn}
                        aria-label="Send another message"
                      >
                        <FaUndo aria-hidden="true" />
                        SEND ANOTHER
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[#1f2937]/65 leading-relaxed">
                    Please do not include highly sensitive personal information. We will confirm the most secure way to share
                    details during follow-up. Contact information is used solely to respond to your inquiry and is not used for
                    marketing or solicitation purposes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 print:hidden mt-5" noValidate>
                  <div className="grid gap-3.5">
                    <label className="block">
                      <span className={label}>Name</span>
                      <input
                        ref={nameRef}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        className={`${input} ${fieldErrors.name ? inputError : ''}`}
                        placeholder="Your full name"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(fieldErrors.name)}
                        disabled={loading}
                      />
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                      <label className="block md:col-span-8">
                        <span className={label}>Email</span>
                        <input
                          ref={emailRef}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                          className={`${input} ${fieldErrors.email ? inputError : ''}`}
                          placeholder="you@example.com"
                          required
                          aria-required="true"
                          aria-invalid={Boolean(fieldErrors.email)}
                          disabled={loading}
                        />
                      </label>

                      <label className="block md:col-span-4">
                        <span className={label}>
                          Phone <span className="text-xs font-normal text-[#1f2937]/55">(optional)</span>
                        </span>
                        <input
                          ref={phoneRef}
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                          inputMode="tel"
                          className={input}
                          placeholder="(519) 123-4567"
                          aria-invalid={Boolean(fieldErrors.phone)}
                          disabled={loading}
                        />
                      </label>
                    </div>
                  </div>

                  <label className="block">
                    <span className={label}>Message</span>
                    <textarea
                      ref={messageRef}
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`${input} ${fieldErrors.message ? inputError : ''} resize-y`}
                      placeholder="Tell us a bit about your goals or questions."
                      required
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.message)}
                      disabled={loading}
                    />
                  </label>

                  {!isV3 && (
                    <div className="pt-1.5">
                      {isV2 ? (
                        <ReCAPTCHA sitekey={V2_SITE_KEY!} onChange={(t) => setCaptchaToken(t)} />
                      ) : (
                        <p className="text-xs text-red-600">
                          reCAPTCHA is not configured. Set VITE_RECAPTCHA_V3_SITE_KEY (preferred) or VITE_RECAPTCHA_SITE_KEY.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="pt-2 grid grid-cols-1 sm:flex sm:flex-wrap gap-3">
                    <button type="submit" disabled={loading} className={primaryBtn} aria-label="Send message">
                      <FaEnvelope aria-hidden="true" />
                      {loading ? 'SENDING…' : 'SEND MESSAGE'}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className={secondaryBtn}
                      aria-label="Reset form"
                      disabled={loading}
                    >
                      <FaUndo aria-hidden="true" />
                      RESET
                    </button>
                  </div>

                  <p className="text-xs text-[#1f2937]/65 leading-relaxed">
                    Please do not include highly sensitive personal information. We will confirm the most secure way to share
                    details during follow-up. Contact information is used solely to respond to your inquiry and is not used for
                    marketing or solicitation purposes.
                  </p>
                </form>
              )}
            </motion.section>

            {/* RIGHT: OFFICE INFO */}
            <motion.section {...(cardIn || {})} className={`${softCard} xl:col-span-5`}>
              <motion.div {...(colIn(0) || {})}>
                <header>
                  <h2 className="mt-0.5 font-sans text-[1.55rem] sm:text-2xl font-semibold tracking-tight text-[#0f5028]">
                    Call or visit our office
                  </h2>
                  <p className="mt-1.5 text-[#1f2937]/70">Appointments by request.</p>
                </header>

                <div className="mt-4 h-px w-full bg-black/10" />
              </motion.div>

              <motion.div {...(colIn(0.06) || {})} className="mt-4">
                <div className="text-sm md:text-base text-[#1f2937]/70 leading-relaxed">
                  <p className="font-semibold text-lg text-[#0f5028]">McNeilly Financial Group</p>
                  <p className="mt-2 text-[15px] leading-7">1608 Sylvestre Drive, Suite 2D</p>
                  <p className="text-[15px] leading-7">Tecumseh, Ontario N8N 2L9</p>

                  <div className="mt-4 space-y-3.5">
                    <div className="space-y-1">
                      <span className={label}>Phone</span>
                      <a
                        href={`tel:${OFFICE_PHONE_TEL}`}
                        className="text-[#1f2937]/75 underline underline-offset-4 decoration-black/15 hover:decoration-black/30 transition"
                        onClick={() => track('phone_click', { event_category: 'Engagement', event_label: 'Office Phone' })}
                        aria-label={`Call ${OFFICE_PHONE}`}
                      >
                        {OFFICE_PHONE}
                      </a>
                    </div>

                    <div className="space-y-1">
                      <span className={label}>Fax</span>
                      <a
                        href={`tel:${OFFICE_FAX_TEL}`}
                        className="text-[#1f2937]/75 underline underline-offset-4 decoration-black/15 hover:decoration-black/30 transition"
                        aria-label={`Fax ${OFFICE_FAX}`}
                      >
                        {OFFICE_FAX}
                      </a>
                    </div>

                    <div className="space-y-1">
                      <span className={label}>Email</span>
                      <a
                        href={OFFICE_EMAIL.startsWith('REPLACE_') ? undefined : `mailto:${OFFICE_EMAIL}`}
                        className="text-[#1f2937]/75 underline underline-offset-4 decoration-black/15 hover:decoration-black/30 transition"
                        onClick={() => track('office_email_click', { event_category: 'Engagement', event_label: 'Office Email' })}
                        aria-label={`Email ${OFFICE_EMAIL}`}
                      >
                        {OFFICE_EMAIL}
                      </a>
                    </div>

                    <div className="space-y-1">
                      <span className={label}>Hours</span>
                      <span className="text-[#1f2937]/75">Monday–Friday, 9:00 AM – 5:00 PM</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={mapBtn}
                      onClick={() => track('directions_click', { event_category: 'Engagement', event_label: 'Google Maps' })}
                      aria-label="Open directions in Google Maps"
                    >
                      <FaMapMarkerAlt aria-hidden="true" />
                      OPEN IN GOOGLE MAPS
                    </a>

                    <a
                      href={appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={mapBtn}
                      onClick={() => track('directions_click', { event_category: 'Engagement', event_label: 'Apple Maps' })}
                      aria-label="Open directions in Apple Maps"
                    >
                      <FaMapMarkerAlt aria-hidden="true" />
                      OPEN IN APPLE MAPS
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.section>
          </div>
        </div>
      </main>

      {/* Print-only footer note */}
      <div className="hidden print:block p-6 text-xs text-gray-700">
        This page was printed on {today}. For security, do not include sensitive information in printed copies.
      </div>
    </div>
  );
};

export default Contact;