import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../images/about-hero.jpg';
import LeadParagraph from 'components/LeadParagraph';
import { FaComments } from 'react-icons/fa';

const handleContactClick = () => {
  window.location.href = '/contact';
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#e5e5e5] text-[#333333] font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0f5028] to-[#4b9328] text-white">
        <img
          src={heroImage}
          alt="About McNeilly Financial Group"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-80 md:h-96 px-4">
          <h1 className="text-[2rem] md:text-5xl lg:text-6xl font-bold leading-tight md:leading-[1.1] drop-shadow-sm px-4 py-2">
            About Our Financial Philosophy
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#e8f7e1]">
            Conservative, disciplined planning that protects capital, supports your lifestyle,
            and provides clarity at every stage of your financial journey.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="bg-white border border-[#d0d0d0] rounded-xl shadow-md p-6 md:p-10">
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 md:gap-10 gap-10"
          >
            {/* Left Column */}
            <article className="text-base md:text-lg space-y-6 leading-relaxed text-[#333333]">
              <LeadParagraph>
                At McNeilly Financial Group, our philosophy is grounded in conservative, disciplined
                financial planning. We focus on protecting capital first, then growing wealth in a
                way that aligns with your goals, time horizon, and comfort with risk.
              </LeadParagraph>

              <section aria-labelledby="investment-approach">
                <h2
                  id="investment-approach"
                  className="text-2xl font-serif font-semibold pt-6 text-[#0f5028]"
                >
                  Investment Approach
                </h2>
                <p className="mt-3 leading-relaxed">
                  <strong>Capital preservation first — sustainable growth always.</strong> We align
                  each portfolio to your objectives and risk tolerance to help minimise volatility
                  while pursuing long-term returns through changing markets.
                </p>
              </section>

              <section aria-labelledby="holistic-planning">
                <h2
                  id="holistic-planning"
                  className="text-2xl font-serif font-semibold pt-6 text-[#0f5028]"
                >
                  Holistic Financial Planning
                </h2>
                <p className="mt-3 leading-relaxed">
                  <strong>Strategies that reflect real life.</strong> Your financial world doesn’t
                  exist in silos. We integrate:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Investment &amp; retirement planning</li>
                  <li>Insurance and risk management</li>
                  <li>Estate and intergenerational wealth planning</li>
                  <li>Tax-efficient structures for individuals and businesses</li>
                </ul>
              </section>

              <section aria-labelledby="tax-structuring">
                <h2
                  id="tax-structuring"
                  className="text-2xl font-serif font-semibold pt-6 text-[#0f5028]"
                >
                  Advanced Tax &amp; Structuring
                </h2>
                <p className="mt-3 leading-relaxed">
                  <strong>Helping you keep more of what you earn.</strong> When appropriate, we work
                  with your professional team to incorporate income splitting, trusts, corporate
                  planning, and other tax-optimization strategies to enhance your after-tax results
                  and preserve wealth across generations.
                </p>
              </section>
            </article>

            {/* Right Column */}
            <article className="text-base md:text-lg space-y-6 leading-relaxed pt-8 lg:pt-0 text-[#333333]">
              <section aria-labelledby="oversight">
                <h2
                  id="oversight"
                  className="text-2xl font-serif font-semibold pt-0 text-[#0f5028]"
                >
                  Ongoing Oversight
                </h2>
                <p className="mt-3 leading-relaxed">
                  <strong>Plans that evolve with you.</strong> We monitor portfolios throughout the
                  year and conduct structured annual reviews to ensure your strategy stays aligned
                  with life events, changing markets, and updated legislation.
                </p>
              </section>

              <section aria-labelledby="leadership">
                <h2
                  id="leadership"
                  className="text-2xl font-serif font-semibold pt-6 text-[#0f5028]"
                >
                  Leadership &amp; Collaboration
                </h2>
                <p className="mt-3 leading-relaxed">
                  <strong>Your chief financial advisor.</strong> Led by{' '}
                  <span className="font-medium">Patrick McNeilly, B.A., B. Comm.</span>, our role is
                  to coordinate the moving parts of your financial life. We collaborate with
                  accountants, lawyers, and other specialists to deliver integrated, execution-ready
                  plans.
                </p>
              </section>

              <section aria-labelledby="client-experience">
                <h2
                  id="client-experience"
                  className="text-2xl font-serif font-semibold pt-6 text-[#0f5028]"
                >
                  Client Experience
                </h2>
                <p className="mt-3 leading-relaxed">
                  <strong>Human, transparent, and accountable.</strong> We believe good advice should
                  feel clear and actionable—not overwhelming. Recommendations are grounded in your
                  values, lifestyle, and priorities, with plain-language explanations at every step.
                </p>
              </section>

              <section aria-labelledby="accessibility">
                <h2
                  id="accessibility"
                  className="text-2xl font-serif font-semibold pt-6 text-[#0f5028]"
                >
                  Accessibility Promise
                </h2>
                <p className="mt-3 leading-relaxed">
                  <strong>You’re never left waiting.</strong> Patrick returns client phone calls the{' '}
                  <span className="font-medium">same business day</span> and responds to or
                  acknowledges emails within <span className="font-medium">24 hours</span>, so you
                  always know where things stand.
                </p>
              </section>

              {/* CTA Button */}
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={handleContactClick}
                  className="flex items-center justify-center gap-2 bg-[#4b9328] hover:bg-[#8cbe3f] text-white tracking-wide px-4 py-2 rounded-xs font-bold text-sm md:text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f] transition duration-300 hover:scale-105"
                  aria-label="Contact us for a free consultation"
                >
                  <FaComments size={18} />
                  <span className="tracking-wide text-[0.95rem] md:text-[1.05rem] uppercase">
                    Free Consultation
                  </span>
                </button>
              </div>
            </article>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default About;