import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaClock,
  FaLocationArrow,
  FaUndo,
  FaLinkedin,
  FaEnvelope,
  FaMap,
} from 'react-icons/fa';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const Contact: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, formData);
      if (response.data.success) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setErrorMessage('');
        window.gtag?.('event', 'form_submit', {
          event_category: 'Contact',
          event_label: 'Contact Form Submission',
        });
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({ name: '', email: '', message: '' });
    setErrorMessage('');
    setFormSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-10 py-12">
      <div className="grid xl:grid-cols-2 gap-14 items-start xl:[@media(max-width:1050px)]:grid-cols-1">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
        <h1 className="sm:text-5xl text-4xl drop-shadow-2xl text-center px-4 py-2 font-bold mb-10 text-[#a8cf7f]">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact Our Team
            </motion.span>
          </h1>

          <p className="text-lg">
            Whether you're seeking guidance on your investments, retirement planning, or financial strategy, we’re here to help.
            Fill out the form below and one of our advisors will get back to you shortly.
          </p>

          <div>
            <label htmlFor="name" className="block font-semibold mb-1">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="First and Last Name"
              required
              className="w-full p-3 border border-[#ccc] rounded-xs focus:outline-none focus:ring-1 focus:ring-lime-600 focus:border-lime-600"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Your Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full p-3 border border-[#ccc] rounded-xs focus:outline-none focus:ring-1 focus:ring-lime-600 focus:border-lime-600"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block font-semibold mb-1">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we assist you?"
              rows={5}
              required
              className="w-full p-3 border border-[#ccc] rounded-xs focus:outline-none focus:ring-1 focus:ring-lime-600 focus:border-lime-600"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          <div className="flex flex-row gap-4">
            {/* Send Message Button */}
            <button
              type="submit"
              className="relative flex-1 xl:w-2/3 group overflow-hidden px-6 py-5 rounded-xs text-lg text-[#333] font-bold tracking-wide flex justify-between items-center transition-all duration-300 hover:bg-[#62a342] hover:text-white shadow"
            >
              <span className="absolute inset-0 w-full h-full bg-[#c2e1a1] transition-transform duration-300 transform group-hover:translate-x-full group-hover:opacity-0"></span>
              <span className="relative z-10 flex items-center justify-between w-full">
                <span>Send Message</span>
                <FaEnvelope className="text-xl ml-3" />
              </span>
            </button>

            {/* Clear Form Button */}
            <button
              type="button"
              onClick={handleClear}
              className="relative flex-none xl:w-16 lg:w-16 md:w-16 sm:w-16 xs:w-16 items-center group overflow-hidden px-5 py-3 rounded-xs text-[#333] tracking-widest transition-all duration-300 hover:bg-[#e5e5e5] shadow"
            >
              <span className="absolute inset-0 w-full h-full bg-[#f0f0f0] transition-transform duration-300 transform group-hover:-translate-x-half group-hover:opacity-0"></span>
              <span className="relative z-10 flex items-center animate-spin-on-hover">
                <FaUndo className="text-xl" />
              </span>
            </button>
          </div>

          {formSubmitted && <p className="text-green-600 text-center mt-4">Thank you! Your message has been received.</p>}
          {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-7"
        >
<div className="bg-[#f0f0f0] shadow rounded-xs p-6 text-gray-800">
  <div className="flex flex-col sm:flex-row gap-6 sm:gap-6">
    {/* Our Office */}
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2 mb-6">
        <FaMap className="text-2xl" />
        <h2 className="text-2xl font-semibold">Our Office</h2>
      </div>
      <p className="font-semibold">McNeilly Financial Group</p>
      <p>1608 Sylvestre Drive</p>
      <p>Suite 2D</p>
      <p>Tecumseh, Ontario</p>
      <p>N8N 2L9</p>
      <p className="mt-6">Phone: <a href="tel:15199795396" className="font-semibold hover:nounderline">(519) 979-5396</a></p>
      <p>Fax: (519) 979-5432</p>
    </div>

    {/* Divider */}
    <div className="w-full h-px bg-[#9b9da0] sm:hidden my-6" />
    <div className="w-px bg-[#9b9da0] hidden sm:block" />

    {/* Our Hours */}
    <div className="flex-1 space-y-1">
      <div className="flex items-center gap-2 mb-6">
        <FaClock className="text-2xl" />
        <h2 className="text-2xl font-semibold">Our Hours</h2>
      </div>
      <p className="font-semibold">Monday – Friday:</p>
      <p className="font-semibold">9:00 AM – 5:00 PM</p>
      <p className="mt-6">Saturday & Sunday,</p>
      <p>Holidays: Closed</p>

      {/* LinkedIn */}
      <div className="flex items-center gap-2 mt-12 group">
        <a
          href="https://www.linkedin.com/company/mcneilly-financial-group"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn"
          className="flex items-center gap-2 hover:text-[#0a66c2] transition-colors"
        >
          <FaLinkedin size={20} className="text-[#0a66c2] group-hover:text-[#0a66c2]" />
          <h2 className="text-1xl font-semibold">Connect on LinkedIn</h2>
        </a>
      </div>

      {/* Directions */}
      <div className="flex items-center gap-2 mt-2 group">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=McNeilly+Financial+Group,+Tecumseh,+Ontario"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions on Google Maps"
          className="flex items-center gap-3 hover:text-[#4b9328] transition-colors"
        >
          <FaLocationArrow size={16} className="text-[#4b9328] group-hover:text-[#4b9328]" />
          <h2 className="text-1xl font-semibold">Get Directions</h2>
        </a>
      </div>
    </div>
  </div>
</div>

      

          {/* Satellite Map */}
          <div>
            <div className="w-full aspect-video rounded-xs overflow-hidden shadow">
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
                  window.gtag?.('event', 'map_view', {
                    event_category: 'Engagement',
                    event_label: 'Satellite Map Viewed',
                  })
                }
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
            {/* Custom Styles */}
            <style>{`
        @media (max-width: 1050px) {
          .custom-contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .animate-spin-on-hover:hover svg {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(90deg); }
        }
      `}</style>
    </div>
  );
};

export default Contact;
