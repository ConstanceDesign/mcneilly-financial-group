import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { FaEnvelope, FaUndo } from 'react-icons/fa';

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Contact: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        token: captchaToken, // this matches what your backend expects
      });

      if (response.data.success) {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="input"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="input"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        className="input"
      />

      {showCaptcha && (
        <ReCAPTCHA
          sitekey={siteKey}
          onChange={(token) => {
            setCaptchaToken(token);
            console.log("Captcha token:", token);
          }}
        />
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`btn ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24" />
          ) : (
            <FaEnvelope className="mr-2" />
          )}
          Send
        </button>

        <button
          type="button"
          onClick={() => {
            setFormData({ name: '', email: '', message: '' });
            setCaptchaToken(null);
            setShowCaptcha(false);
          }}
          className="btn"
        >
          <FaUndo className="mr-2" /> Clear
        </button>
      </div>
    </form>
  );
};

export default Contact;