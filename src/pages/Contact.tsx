import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  FaEnvelope,
  FaUndo,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaLinkedin,
  FaCheckCircle,
  FaChevronRight,
  FaMap,
} from 'react-icons/fa';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const Contact: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // v2 checkbox key
  const V2_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
  // v3 invisible key (preferred)
  const V3_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY as string | undefined;

  const isV3 = Boolean(V3_SITE_KEY);
  const isV2 = Boolean(V2_SITE_KEY);

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

  const alertRef = useRef<HTMLDivElement>(null);

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
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSubmitted(false);
  };

  const validate = () => {
    if (!formData.name.trim()) return 'Please enter your name.';
    if (!formData.email.trim()) return 'Please enter your email.';
    if (!formData.message.trim()) return 'Please enter a message.';
    return null;
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setCaptchaToken(null);
    setError(null);
    setSubmitted(false);
    track('contact_reset', { event_category: 'Contact', event_label: 'Reset' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const v = validate();
    if (v) {
      setError(v);
      track('contact_submit_error', { event_category: 'Contact', event_label: v });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let tokenToSend: string | null = captchaToken;

      // v3 preferred
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

        track('form_submit', {
          event_category: 'Contact',
          event_label: 'Contact Form Submission',
        });
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

  return (
    <div className="min-h-screen bg-[#E5E5E5] text-[#333333] font-sans">
      {/* Print-only header */}
      <div className="hidden print:block p-6">
        <h1 className="text-2xl font-semibold text-[#0f5028]">Contact Request</h1>
        <p className="text-sm text-gray-800 mt-1">Date: {today}</p>
      </div>

      {/* HERO */}
      <header className="print:hidden">
        <section className="bg-gradient-to-r from-[#0f5028] to-[#4b9328] text-white">
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight">
              Contact Our Team
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#e8f7e1] leading-relaxed">
              Clear, conservative guidance for retirement, insurance, and long-term planning — in
              person or virtually.
            </p>
          </div>
        </section>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-14 space-y-8">
        {/* CARD 1: FORM + HOW WE WORK (same section) */}
        <section className="bg-white rounded-xl shadow-md border border-[#d4d4d4] p-8">
          <div className="grid gap-10 lg:grid-cols-[3fr,2fr]">
            {/* LEFT: FORM */}
            <div>
              <header className="flex items-center gap-3 mb-2">
                <FaEnvelope className="text-[#4b9328] text-2xl" aria-hidden="true" />
                <h2 className="font-serif text-2xl font-semibold text-[#0f5028]">
                  Send Us a Message
                </h2>
              </header>

              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                Share a few details and we’ll follow up with practical next steps — no pressure,
                ever.
              </p>

              {(error || submitted) && (
                <div
                  ref={alertRef}
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  className={`mb-5 rounded-lg border p-4 outline-none ${
                    error
                      ? 'border-red-300 bg-red-50 text-red-800'
                      : 'border-[#8cbe3f] bg-[#f1f7ea] text-[#0f5028]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <FaCheckCircle
                      className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-[#4b9328]'}`}
                      aria-hidden="true"
                    />
                    <div className="text-sm md:text-base font-medium leading-relaxed">
                      {error ? error : 'Thank you — your message has been sent.'}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 print:hidden">
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm font-semibold text-[#0f5028]">Name</span>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="mt-1 w-full rounded-xs border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]"
                      placeholder="Your full name"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm font-semibold text-[#0f5028]">Email</span>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="mt-1 w-full rounded-xs border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="block text-sm font-semibold text-[#0f5028]">
                    Phone <span className="text-xs font-normal text-slate-500">(optional)</span>
                  </span>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    inputMode="tel"
                    className="mt-1 w-full rounded-xs border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]"
                    placeholder="(519) 123-4567"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-semibold text-[#0f5028]">Message</span>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xs border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f] resize-y"
                    placeholder="Tell us a bit about your goals or questions."
                  />
                </label>

                {/* reCAPTCHA */}
                {!isV3 && (
                  <div className="pt-2">
                    {isV2 ? (
                      <ReCAPTCHA sitekey={V2_SITE_KEY!} onChange={(t) => setCaptchaToken(t)} />
                    ) : (
                      <p className="text-xs text-red-600">
                        reCAPTCHA is not configured. Set VITE_RECAPTCHA_V3_SITE_KEY (preferred) or
                        VITE_RECAPTCHA_SITE_KEY.
                      </p>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn flex items-center gap-2 justify-center bg-[#4b9328] hover:bg-[#8cbe3f] text-white font-bold px-4 py-2 rounded shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <FaEnvelope aria-hidden="true" />
                    {loading ? 'Sending…' : 'Send Message'}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn flex items-center gap-2 justify-center bg-white border border-gray-300 hover:bg-gray-50 text-[#0f5028] font-bold px-4 py-2 rounded shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/40"
                    aria-label="Reset form"
                  >
                    <FaUndo aria-hidden="true" />
                    Reset
                  </button>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed pt-2">
                  Please do not include highly sensitive personal information. We’ll confirm the best
                  way to share details during follow-up.
                </p>
              </form>
            </div>

            {/* RIGHT: HOW WE WORK (same card) */}
            <aside aria-label="How we work with you" className="space-y-4">
              <header className="inline-flex items-center gap-3">
                <FaCheckCircle className="text-[#4b9328] text-xl" aria-hidden="true" />
                <h3 className="font-serif text-xl font-semibold text-[#0f5028]">
                  How We Work With You
                </h3>
              </header>

              <div className="rounded-xl border border-[#8cbe3f] bg-[#f1f7ea] p-5 shadow-sm">
                <ul className="space-y-2 text-sm md:text-base text-[#0f5028] font-medium leading-relaxed">
                  <li className="flex items-start gap-2">
                    <FaChevronRight className="mt-1.5 text-xs text-[#4b9328]" aria-hidden="true" />
                    <span>We start with your goals, timeline, and risk comfort — not products.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaChevronRight className="mt-1.5 text-xs text-[#4b9328]" aria-hidden="true" />
                    <span>We explain options clearly, then outline practical next steps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaChevronRight className="mt-1.5 text-xs text-[#4b9328]" aria-hidden="true" />
                    <span>Meetings are available in person or virtually across Ontario.</span>
                  </li>
                </ul>
              </div>

              <div className="text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  If you’re not sure where to start, send a brief note. We’ll point you to the most
                  useful first step.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* CARD 2: OUR OFFICE (LEFT) + MAP (RIGHT) */}
        <section className="bg-white rounded-xl shadow-md border border-[#d4d4d4] p-8">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* LEFT: OUR OFFICE */}
            <div>
              <header className="flex items-center gap-2 mb-4">
                <FaMap className="text-[#4b9328] text-xl" aria-hidden="true" />
                <h2 className="font-serif text-2xl font-semibold text-[#0f5028]">Our Office</h2>
              </header>

              <div className="text-sm md:text-base text-slate-700 leading-relaxed space-y-4">
                <div className="rounded-xl border border-[#d4d4d4] bg-[#f8f9f7] p-5">
                  <p className="font-semibold text-[#0f5028]">McNeilly Financial Group</p>
                  <p>1608 Sylvestre Drive, Suite 2D</p>
                  <p>Tecumseh, Ontario</p>
                  <p>N8N 2L9</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <FaPhoneAlt className="text-[#4b9328]" aria-hidden="true" />
                      <span>(519) 979-5396</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-[#4b9328]" aria-hidden="true" />
                      <span>Mon–Fri, 9:00 AM – 5:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FaLinkedin className="text-[#0a66c2]" aria-hidden="true" />
                    <a
                      href="https://www.linkedin.com/company/mcneilly-financial-group"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                      onClick={() =>
                        track('contact_link_click', {
                          event_category: 'Contact',
                          event_label: 'LinkedIn',
                        })
                      }
                    >
                      Connect on LinkedIn
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#4b9328]" aria-hidden="true" />
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=McNeilly+Financial+Group,+Tecumseh,+Ontario"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                      onClick={() =>
                        track('contact_link_click', {
                          event_category: 'Contact',
                          event_label: 'Directions',
                        })
                      }
                    >
                      Get Directions
                    </a>
                  </div>
                </div>

                <p className="text-xs text-slate-500 pt-1">
                  For fastest service, use the message form and we’ll reply by email.
                </p>
              </div>
            </div>

            {/* RIGHT: MAP */}
            <div>
              <header className="flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-[#4b9328] text-xl" aria-hidden="true" />
                <h2 className="font-serif text-2xl font-semibold text-[#0f5028]">Map</h2>
              </header>

              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-[#d4d4d4] bg-white">
                <iframe
                  title="McNeilly Financial Group Office Location - Satellite View"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2916.342227835676!2d-82.8762024!3d42.3051101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b31c8b02c7b4d%3A0x7600832066f7306b!2s1608%20Sylvestre%20Dr%20%232D%2C%20Tecumseh%2C%20ON%20N8N%202L9%2C%20Canada!5e0!3m2!1sen!2sus!4v1685045914896!5m2!1sen!2sus&t=k"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() =>
                    track('map_view', {
                      event_category: 'Engagement',
                      event_label: 'Satellite Map Viewed',
                    })
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Print-only footer note */}
      <div className="hidden print:block p-6 text-xs text-gray-700">
        This page was printed on {today}. For security, do not include sensitive information in printed copies.
      </div>
    </div>
  );
};

export default Contact;