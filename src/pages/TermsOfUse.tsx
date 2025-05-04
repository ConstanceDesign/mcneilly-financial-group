import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-brand-darkgreen">Terms of Use</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the McNeilly Financial Group website, you agree to be bound by these Terms of Use and all
          applicable laws and regulations. If you do not agree, please do not use the site.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Use of Website</h2>
        <p>
          This website is intended to provide general financial and insurance information. The content is for informational
          purposes only and should not be considered personalized financial advice.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
        <p>
          All content, branding, graphics, and materials on this site are the intellectual property of McNeilly Financial Group
          unless otherwise stated. Unauthorized use is prohibited.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Links to Third-Party Sites</h2>
        <p>
          This site may contain links to third-party websites. We are not responsible for the content or accuracy of these
          external sites. Use them at your own risk.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
        <p>
          McNeilly Financial Group is not liable for any direct, indirect, or consequential damages arising from the use or
          inability to use this site or any linked content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Modifications</h2>
        <p>
          We reserve the right to update or change these terms at any time without notice. Continued use of the site after
          changes constitutes acceptance of the new terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Governing Law</h2>
        <p>
          These Terms of Use are governed by the laws of the Province of Ontario, Canada, without regard to conflict of law
          principles.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Contact Information</h2>
        <p>For questions regarding these Terms, please contact us:</p>
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

export default TermsOfUse;