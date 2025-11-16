// 

import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { FaEnvelope, FaUndo, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Contact: React.FC = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // Show CAPTCHA only after user begins typing
    if (!showCaptcha && value.trim().length > 0) {
      setShowCaptcha(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all fields.');
      return;
    }

    if (!captchaToken) {
      toast.error('Please complete the reCAPTCHA.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_BASE_URL}/api/contact`, {
        ...formData,
        token: captchaToken, // matches what your backend expects
      });

      if (response.data?.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setCaptchaToken(null);
        setShowCaptcha(false);
      } else {
        toast.error('Message failed. Try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', message: '' });
    setCaptchaToken(null);
    setShowCaptcha(false);
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-[#333333] font-sans flex flex-col">
      {/* HERO */}
      <header>
        <section className="relative w-full bg-gradient-to-r from-[#0f5028] to-[#4b9328] text-white">
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-64 md:h-80 px-4">
            <h1 className="text-[2.2rem] md:text-5xl lg:text-6xl font-serif font-bold leading-tight md:leading-[1.1] drop-shadow-sm px-4 py-2">
              Let&apos;s Talk About Your Financial Plan
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#e8f7e1]">
              Have questions about retirement, insurance, or investments?
              Share a few details and we&apos;ll follow up to schedule a
              conversation.
            </p>
          </div>
        </section>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="bg-white border border-[#d0d0d0] rounded-xl shadow-md p-6 md:p-10 grid gap-10 lg:grid-cols-[3fr,2fr]">
            {/* FORM COLUMN */}
            <section aria-labelledby="contact-form-heading">
              <h2
                id="contact-form-heading"
                className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-[#0f5028]"
              >
                Send Us a Message
              </h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed text-slate-700">
                Complete the form below and we&apos;ll be in touch as soon as
                possible. We respect your time and your privacy — no spam, ever.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-[#0f5028]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-xs border border-gray-300 bg-white px-3 py-2 text-sm md:text-base shadow-sm focus:border-[#4b9328] focus:ring-2 focus:ring-[#8cbe3f] outline-none"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#0f5028]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-xs border border-gray-300 bg-white px-3 py-2 text-sm md:text-base shadow-sm focus:border-[#4b9328] focus:ring-2 focus:ring-[#8cbe3f] outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[#0f5028]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="mt-1 block w-full rounded-xs border border-gray-300 bg-white px-3 py-2 text-sm md:text-base shadow-sm focus:border-[#4b9328] focus:ring-2 focus:ring-[#8cbe3f] outline-none resize-vertical"
                    placeholder="Tell us a bit about your goals or questions."
                  />
                </div>

                {/* reCAPTCHA */}
                {showCaptcha && (
                  <div className="pt-2">
                    {siteKey ? (
                      <ReCAPTCHA
                        sitekey={siteKey}
                        onChange={(token) => {
                          setCaptchaToken(token);
                          // console.log('Captcha token:', token);
                        }}
                      />
                    ) : (
                      <p className="text-xs text-red-600">
                        reCAPTCHA is not configured. Please set
                        VITE_RECAPTCHA_SITE_KEY in your environment.
                      </p>
                    )}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 bg-[#4b9328] hover:bg-[#8cbe3f] text-white tracking-wide px-4 py-2 rounded-xs font-bold text-sm md:text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f] transition duration-300 ${
                      loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                    aria-label="Send your message"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                          />
                        </svg>
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <FaEnvelope className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center justify-center gap-2 bg-white text-[#4b9328] border border-[#4b9328] tracking-wide px-4 py-2 rounded-xs font-bold text-sm md:text-base shadow-sm hover:bg-[#f4faeb] hover:text-[#0f5028] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f] transition duration-300"
                    aria-label="Clear the form"
                  >
                    <FaUndo className="h-4 w-4" />
                    <span>Clear</span>
                  </button>
                </div>
              </form>
            </section>

            {/* INFO COLUMN */}
            <aside
              aria-labelledby="contact-info-heading"
              className="space-y-6 text-sm md:text-base leading-relaxed text-slate-700"
            >
              <h2
                id="contact-info-heading"
                className="text-2xl md:text-3xl font-serif font-semibold text-[#0f5028]"
              >
                How We Work With You
              </h2>
              <p>
                Every new relationship begins with a conversation. We&apos;ll
                discuss your goals, questions, and current situation, and then
                outline practical next steps — without pressure or obligation.
              </p>
              <p>
                Whether you&apos;re planning for retirement, protecting your
                family, or organizing a business transition, we&apos;re here to
                provide clear, conservative guidance.
              </p>

              <div className="pt-2 space-y-3">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 text-[#4b9328]" />
                  <div>
                    <p className="font-semibold text-[#0f5028]">Email</p>
                    <p>Use the form to reach us directly and we&apos;ll reply as soon as we can.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhoneAlt className="mt-1 text-[#4b9328]" />
                  <div>
                    <p className="font-semibold text-[#0f5028]">Phone</p>
                    <p>
                      Prefer to speak live? Include your phone number and a good
                      time to reach you in your message.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-[#4b9328]" />
                  <div>
                    <p className="font-semibold text-[#0f5028]">Location</p>
                    <p>
                      Serving clients across Ontario and beyond with both in-person and virtual meetings.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 pt-2">
                Please do not include highly sensitive personal information in
                this form. We&apos;ll let you know the best way to share
                anything more detailed during our follow-up.
              </p>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;