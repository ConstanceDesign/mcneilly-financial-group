import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaClock,
  FaLocationArrow,
  FaBroom,
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
    <div className="max-w-7xl mx-auto px-4 py-12">

      <div className="grid md:grid-cols-2 gap-14 items-start">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-[#9b9da0]">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let’s Start a Conversation
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
              placeholder="Jane Doe"
              required
              className="w-full p-3 border border-[#ccc] rounded-sm focus:ring-1 focus:ring-lime-600"
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
              className="w-full p-3 border border-[#ccc] rounded-sm focus:ring-1 focus:ring-lime-600"
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
              className="w-full p-3 border border-[#ccc] rounded-sm focus:ring-1 focus:ring-lime-600"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          <div className="flex flex-col xl:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 xl:w-2/3 inline-flex items-center justify-center gap-2 py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition"
            >
              <FaEnvelope className="text-2xl mr-2" />
              Send Message
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="flex-1 xl:w-1/3 inline-flex items-center justify-center gap-2 py-3 px-6 text-gray-700 border border-gray-400 hover:bg-gray-100 rounded-md font-medium transition"
            >
              <FaBroom className="text-2xl mr-2" />
              Clear Form
            </button>
          </div>

          {formSubmitted && <p className="text-green-600 text-center mt-4">Thank you! Your message has been received.</p>}
          {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-[#f0f0f0] border border-[#ccc] shadow rounded-md p-6 text-gray-800">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">

              {/* Office Info */}
              <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 mb-6">
           <FaMap className="text-2xl text-[#838588] " />
                <h2 className="text-2xl font-semibold text-[#838588] ">Our Office</h2>
</div>


                <div className="mt-6"></div>
                <p className="font-semibold">McNeilly Financial Group</p>
                <p>1608 Sylvestre Drive</p>
                <p>Suite 2D</p>
                <p>Tecumseh, Ontario</p>
                <p>N8N 2L9</p>
                <div className="mt-6"></div>
                <p>Phone: <a href="tel:15199795396" className="font-semibold hover:nounderline">(519) 979-5396</a></p>
                <p>Fax: (519) 979-5432</p>
              </div>

              {/* Divider */}
              <div className="w-px bg-[#9b9da0] hidden md:block" />

              {/* Business Hours */}
              <div className="flex-1 space-y-1">

              <div className="flex items-center gap-2 mb-6">
           <FaClock className="text-2xl text-[#838588] " />
                <h2 className="text-2xl font-semibold text-[#838588] ">Business Hours</h2>
</div>

                <div className="mt-6"></div>
                <p className="font-semibold">Monday – Friday:</p>
                <p className="font-semibold">9:00 AM – 5:00 PM</p>
                <div className="mt-6"></div>
                <p>Saturday & Sunday,</p>
                <p>Holidays: Closed</p>
                

                {/* LinkedIn */}
                <div className="flex items-center gap-2 mb-6 mt-6">
                  <a
                    href="https://www.linkedin.com/company/mcneilly-financial-group"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect on LinkedIn"
                  >
                    {/* <FaLinkedin size={20} className="text-blue-700" />
                    <p className="font-semibold">Connect on LinkedIn</p> */}


                    <div className="flex items-center gap-2 mb-6">
           <FaClock className="text-2xl text-[#838588] " />
                <h2 id="mutual-funds" className="text-2xl font-semibold text-[#838588] ">Business Hours</h2>
</div>

                    
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=McNeilly+Financial+Group,+Tecumseh,+Ontario"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-50 h-8 gap-2 tracking-wide bg-[#4b9328] text-white hover:bg-[#8cbe3f] hover:text-white font-bold text-base transition-all duration-300 hover:scale-110 rounded-xs"
              aria-label="Get directions in Google Maps"
              >
                <FaLocationArrow size={16} />
                <span className="tracking-wide text-[1.10rem] uppercase">Get Directions</span>
              </a>
            </div>

          {/* Map + Directions */}
          <div>
            <div className="w-full aspect-video rounded-md overflow-hidden border border-[#ccc] shadow-lg">
              <iframe
                title="McNeilly Financial Group Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2916.342227835676!2d-82.8762024!3d42.3051101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b31c8b02c7b4d%3A0x7600832066f7306b!2s1608%20Sylvestre%20Dr%20%232D%2C%20Tecumseh%2C%20ON%20N8N%202L9%2C%20Canada!5e0!3m2!1sen!2sus!4v1685045914896!5m2!1sen!2sus"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() =>
                  window.gtag?.('event', 'map_view', {
                    event_category: 'Engagement',
                    event_label: 'Map Viewed',
                  })
                }
              ></iframe>
            </div>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;