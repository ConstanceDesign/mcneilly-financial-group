import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from '../images/wealth-hero.jpg';
import LeadParagraph from 'components/LeadParagraph';
import { FaChevronDown, FaComments } from 'react-icons/fa';

const Wealth: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const toggleAccordion = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const investmentOptions = [
    {
      title: 'GICs - Guaranteed Investment Certificates',
      content: (
        <>
          <p className="leading-relaxed">
            A guaranteed investment vehicle with a fixed interest rate and guaranteed return of
            principal at maturity.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#4b9328]">
            RISK: CDIC-insured up to $100,000
          </p>
          <p className="mt-1 text-sm font-semibold text-[#4b9328]">
            TAX: Taxable on interest earned
          </p>
        </>
      ),
    },
    {
      title: 'Bonds',
      content: (
        <p className="leading-relaxed">
          Fixed-income investments where you lend money to a government or corporation in exchange
          for regular interest payments and the return of your principal at maturity.
        </p>
      ),
    },
    {
      title: 'Segregated Funds',
      content: (
        <p className="leading-relaxed">
          Insurance-based investment products that offer market growth potential like mutual funds,
          but with added benefits such as death benefit guarantees and potential creditor protection.
        </p>
      ),
    },
    {
      title: 'Mutual Funds',
      content: (
        <p className="leading-relaxed">
          Investment pools managed by professionals that combine money from many investors to buy a
          diversified portfolio of stocks, bonds, or other securities.
        </p>
      ),
    },
    {
      title: 'RRSPs - Registered Retirement Savings Plans',
      content: (
        <p className="leading-relaxed">
          A tax-advantaged account for retirement savings that can reduce taxable income today while
          helping grow wealth for the future.
        </p>
      ),
    },
    {
      title: 'Group RRSPs - Employer-Sponsored',
      content: (
        <p className="leading-relaxed">
          Employer-sponsored RRSPs that offer payroll contributions, potential employer matching,
          and the convenience of disciplined, automatic savings.
        </p>
      ),
    },
    {
      title: 'RESPs - Registered Education Savings Plans',
      content: (
        <p className="leading-relaxed">
          Plan ahead for education expenses with a tax-deferred savings plan that offers government
          grants and growth potential for a child&apos;s post-secondary education.
        </p>
      ),
    },
    {
      title: 'Universal Life Insurance',
      content: (
        <p className="leading-relaxed">
          Flexible life insurance with built-in investment options, designed to grow value over time
          while providing lifelong protection and estate planning benefits.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-[#333333] font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0f5028] to-[#4b9328] text-white">
        <img
          src={heroImage}
          alt="Investing for the future"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-80 md:h-96 px-4">
          <h1 className="text-[2rem] md:text-5xl lg:text-6xl font-bold leading-tight md:leading-[1.1] drop-shadow-sm px-4 py-2">
            Secure Your Future by Investing
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#e8f7e1]">
            Thoughtful saving and investing can help protect your lifestyle today while building the
            assets you&apos;ll rely on tomorrow.
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
                Saving is the foundation of financial security. At McNeilly Financial Group, we
                emphasize thoughtful investing to protect your future, preserve capital, and grow
                wealth over time.
              </LeadParagraph>

              <h2 className="text-2xl font-serif font-semibold pt-6 text-[#0f5028]">
                Why Should I Save?
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To protect against the unforeseen and uncontrollable</li>
                <li>To lower the risk of inflation depleting savings</li>
                <li>Because of decreased government pensions</li>
                <li>To acquire and grow assets</li>
                <li>To supplement other sources of income</li>
              </ul>

              <h2 className="text-2xl font-serif font-semibold pt-6 text-[#0f5028]">
                An Investment Professional Can:
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Help set clear and customized financial goals</li>
                <li>Assess your comfort with risk to build a suitable strategy</li>
                <li>Provide access to a range of investment solutions</li>
                <li>Optimize your tax efficiency</li>
                <li>Monitor, review, and adjust strategies over time</li>
              </ul>
            </article>

            {/* Right Column */}
            <article className="text-base md:text-lg space-y-6 leading-relaxed pt-8 lg:pt-0 text-[#333333]">
              <h2 className="text-2xl pb-3 font-serif font-semibold text-[#0f5028]">
                Our Investment Solutions Include:
              </h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="text-base md:text-lg space-y-6 leading-relaxed md:pt-0"
                >
                  <div className="border border-[#c2e1a1] rounded-md overflow-hidden bg-white">
                    {investmentOptions.map((item, index) => {
                      const isActive = activeIndex === index;
                      return (
                        <div key={index}>
                          <button
                            onClick={() => toggleAccordion(index)}
                            className={`
                              w-full flex justify-between items-center px-4 py-3 text-left font-semibold transition-all duration-300 group
                              ${
                                isActive
                                  ? 'bg-[#dceec3] text-[#0f5028]'
                                  : 'bg-white text-[#4b9328] hover:bg-[#f4faeb]'
                              }
                              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f]
                            `}
                            aria-expanded={isActive}
                            aria-controls={`accordion-content-${index}`}
                          >
                            <span className="transition-colors duration-300">
                              {item.title}
                            </span>
                            <motion.span
                              animate={{ rotate: isActive ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-lg"
                              aria-hidden="true"
                            >
                              <FaChevronDown />
                            </motion.span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                key={`content-${index}`}
                                id={`accordion-content-${index}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35 }}
                                className="px-4 pb-4 pt-2 text-base md:text-lg border-t border-[#c2e1a1] bg-[#f9fff4]"
                              >
                                {item.content}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {index < investmentOptions.length - 1 && !isActive && (
                            <div className="border-t border-[#e0f0cf]" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <p className="pt-2 leading-relaxed">
                McNeilly Financial Group tailors investment strategies to meet your unique
                objectives, offering peace of mind through clarity, communication, and ongoing
                support.
              </p>

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

export default Wealth;