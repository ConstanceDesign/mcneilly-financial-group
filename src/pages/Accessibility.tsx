import React from 'react';

const Accessibility: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-darkgreen mb-6">Accessibility Statement</h1>

      <p className="text-gray-700 mb-4">
        McNeilly Financial Group is committed to ensuring digital accessibility for people of all abilities. We strive to continuously improve the user experience for everyone and apply relevant accessibility standards where possible.
      </p>

      <p className="text-gray-700 mb-4">
        Our website is designed to be compatible with modern browsers and assistive technologies. We aim to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA wherever feasible.
      </p>

      <p className="text-gray-700 mb-4">
        If you encounter any barriers while using our site or have suggestions for improvement, please contact us. Your feedback helps us make our services more inclusive and accessible for all.
      </p>

      <p className="text-gray-700">
        You can reach us via our <a href="/contact" className="text-blue-600 hover:underline">Contact</a> page, and we’ll do our best to address your concerns promptly.
      </p>
    </div>
  );
};

export default Accessibility;