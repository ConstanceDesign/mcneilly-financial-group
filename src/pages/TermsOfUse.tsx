import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-18">
      <h1 className="text-4xl font-bold text-[#333] mb-10">Terms of Use</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg leading-relaxed">
        {/* Left Column */}
        <div className="text-[#333] space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the McNeilly Financial Group website, you agree to be bound by these Terms of Use and all
              applicable laws and regulations. If you do not agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Use of Website</h2>
            <p>
              This website is intended to provide general financial and insurance information. The content is for informational
              purposes only and should not be considered personalized financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Intellectual Property</h2>
            <p>
              All content, branding, graphics, and materials on this site are the intellectual property of McNeilly Financial Group
              unless otherwise stated. Unauthorized use is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Links to Third-Party Sites</h2>
            <p>
              This site may contain links to third-party websites. We are not responsible for the content or accuracy of these
              external sites. Use them at your own risk.
            </p>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Limitation of Liability</h2>
            <p>
              McNeilly Financial Group is not liable for any direct, indirect, or consequential damages arising from the use or
              inability to use this site or any linked content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Modifications</h2>
            <p>
              We reserve the right to update or change these terms at any time without notice. Continued use of the site after
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Governing Law</h2>
            <p>
              These Terms of Use are governed by the laws of the Province of Ontario, Canada, without regard to conflict of law
              principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Information</h2>
            <p>For questions regarding these Terms, please contact us:</p>
            <address className="mt-4 not-italic space-y-2">
              <p className="font-semibold">McNeilly Financial Group</p>
              <div>
                Email:{' '}
                <a
                  href="mailto:info@mcneillyfinancialgroup.com"
                  className="text-[#4b9328] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#4b9328]"
                >
                  info@mcneillyfinancialgroup.com
                </a>
              </div>
              <div>
                Phone:{' '}
                <a
                  href="tel:+15199795396"
                  className="text-[#4b9328] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#4b9328]"
                >
                  (519) 979-5396
                </a>
              </div>
            </address>
          </section>

          <p className="text-sm">Last updated: April 30, 2025</p>
        </div>
      </div>
    </main>
  );
};

export default TermsOfUse;