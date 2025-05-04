import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-brand-darkgreen">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          McNeilly Financial Group is committed to safeguarding your personal information. This Privacy Policy explains how
          we collect, use, and protect the information you provide to us.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Your name, email address, phone number, or other contact details</li>
          <li>Financial or insurance-related details you choose to share</li>
          <li>Usage data from our website (cookies, browser type, etc.)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Respond to inquiries and provide financial guidance</li>
          <li>Send updates or important service-related communications</li>
          <li>Improve our website and service offerings</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Data Protection</h2>
        <p>
          We implement security measures to ensure your data is not lost, misused, accessed without authorization, or
          disclosed inappropriately.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Sharing Information</h2>
        <p>
          We do not sell your personal information. We may share it with trusted service providers when necessary for business
          operations, under confidentiality agreements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
        <p>
          You can request access to, correction of, or deletion of your personal information by contacting us. We comply with all
          applicable privacy regulations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
        <p>If you have questions about this Privacy Policy or how we handle your data, please contact us:</p>
        <address className="mt-2 not-italic">
          McNeilly Financial Group<br />
          Email: <a href="mailto:info@mcneillyfinancialgroup.com" className="text-blue-600 hover:underline">info@mcneillyfinancialgroup.com</a><br />
          Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">(123) 456-7890</a>
        </address>
      </section>

      <p className="text-sm text-gray-600 mt-8">Last updated: April 30, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;