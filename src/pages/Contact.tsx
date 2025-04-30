import React, { useState } from 'react';
import axios from 'axios'; 

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      if (response.data.success) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setErrorMessage('');
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
  
        <title>Contact Us | McNeilly Financial Group</title>
        <meta
          name="description"
          content="Get in touch with McNeilly Financial Group for expert financial advice. Contact us today!"
        />
        <meta name="robots" content="index, follow" />
 

      <h1 className="text-3xl font-semibold text-center mb-8" aria-label="Contact Us">
        Contact Us
      </h1>

      <form onSubmit={handleSubmit} className="contact-form space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium mb-2" aria-label="Name">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-required="true"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium mb-2" aria-label="Email">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-required="true"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-lg font-medium mb-2" aria-label="Message">
            Your Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-required="true"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Success Message */}
      {formSubmitted && (
        <p className="text-green-600 mt-4 text-center">
          Thank you for contacting us. We’ll get back to you soon!
        </p>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p className="text-red-600 mt-4 text-center">
          {errorMessage}
        </p>
      )}

      {/* Map */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Find Us on the Map</h2>
        <div className="w-full h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243653.3533596745!2d-75.10171107487873!3d39.96336220048791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b6b4c576ef7db9%3A0x62737b28a62e9e29!2sPhiladelphia%2C%20PA!5e0!3m2!1sen!2sus!4v1648296448038!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: '0' }}
            allowFullScreen={true}
            aria-label="Google Map showing our location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;