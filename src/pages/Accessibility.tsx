import React from 'react';

const Accessibility: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-50 py-18">
      <h1 className="text-4xl text-[#333] font-bold mb-10">Accessibility Statement</h1>

      <div className="grid grid-cols-1 gap-10 text-lg leading-relaxed">
        <div className="space-y-6 text-[#333]">
          <p>
            McNeilly Financial Group is committed to ensuring digital accessibility for people of all abilities. We strive to continuously improve the user experience for everyone and apply relevant accessibility standards where possible.
          </p>

          <p>
            Our website is designed to be compatible with modern browsers and assistive technologies. We aim to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA wherever feasible.
          </p>
    
          <p>
            If you encounter any barriers while using our site or have suggestions for improvement, please contact us. Your feedback helps us make our services more inclusive and accessible for all.
          </p>

          <p>
            You can reach us via our{' '}
            <a
              href="/contact"
              aria-label="Go to the Contact Page"
              className="font-semibold text-[#4b9328] hover:underline focus:outline-none focus:ring-2 focus:ring-[#4b9328]"
            >
              Contact
            </a>{' '}
            page, and we’ll do our best to address your concerns promptly.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Accessibility;
