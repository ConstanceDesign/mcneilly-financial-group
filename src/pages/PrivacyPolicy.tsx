import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-18">
      <h1 className="text-4xl font-bold text-[#333] mb-10">Privacy Policy</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg leading-relaxed">
        {/* Left Column: Policy Sections */}
        <div className="text-[#333] space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p>
              McNeilly Financial Group is committed to safeguarding your personal information. This Privacy Policy explains
              how we collect, use, and protect the information you provide to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-none mt-3 space-y-1">
            <li className="hanging-li">Your name, email address, phone number, or other contact details</li>
            <li className="hanging-li">Financial or insurance-related details you choose to share</li>
            <li className="hanging-li">Usage data from our website (cookies, browser type, etc.)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-none mt-3 space-y-1">
            <li className="hanging-li">Respond to inquiries and provide financial guidance</li>
            <li className="hanging-li">Send updates or important service-related communications</li>
                <li className="hanging-li">Improve our website and service offerings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Protection</h2>
            <p>
              We implement security measures to ensure your data is not lost, misused, accessed without authorization, or
              disclosed inappropriately.
            </p>
          </section>
          </div>

        {/* Right Column */}
        <div className="space-y-10">
        <section>
            <h2 className="text-2xl font-semibold mb-3">5. Sharing Information</h2>
            <p>
              We do not sell your personal information. We may share it with trusted service providers when necessary for
              business operations, under confidentiality agreements.
            </p>
          </section>
        <section>
            <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
            <p>
              You can request access to, correction of, or deletion of your personal information by contacting us. We comply
              with all applicable privacy regulations.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or how we handle your data, please contact us:</p>
            <address className="mt-4 not-italic space-y-2">
            <p className="font-semibold">McNeilly Financial Group</p>
              <div>
                Email:{' '}
                <a
                  href="mailto:pmcneilly@sterlingmutuals.com"
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

          <p className="text-sm ">Last updated: April 30, 2025</p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;