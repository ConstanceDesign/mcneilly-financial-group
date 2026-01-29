import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
            A guaranteed investment vehicle with a fixed interest rate and guaranteed return of principal at maturity.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#2f7a2e]">RISK: CDIC-insured up to $100,000</p>
          <p className="mt-1 text-sm font-semibold text-[#2f7a2e]">TAX: Taxable on interest earned</p>
        </>
      ),
    },
    {
      title: 'Bonds',
      content: (
        <p className="leading-relaxed">
          Fixed-income investments where you lend money to a government or corporation in exchange for regular interest
          payments and the return of your principal at maturity.
        </p>
      ),
    },
    {
      title: 'Segregated Funds',
      content: (
        <p className="leading-relaxed">
          Insurance-based investment products that offer market growth potential like mutual funds, but with added
          benefits such as death benefit guarantees and potential creditor protection.
        </p>
      ),
    },
    {
      title: 'Mutual Funds',
      content: (
        <p className="leading-relaxed">
          Investment pools managed by professionals that combine money from many investors to buy a diversified portfolio
          of stocks, bonds, or other securities.
        </p>
      ),
    },
    {
      title: 'RRSPs - Registered Retirement Savings Plans',
      content: (
        <p className="leading-relaxed">
          A tax-advantaged account for retirement savings that can reduce taxable income today while helping grow wealth
          for the future.
        </p>
      ),
    },
    {
      title: 'Group RRSPs - Employer-Sponsored',
      content: (
        <p className="leading-relaxed">
          Employer-sponsored RRSPs that offer payroll contributions, potential employer matching, and the convenience of
          disciplined, automatic savings.
        </p>
      ),
    },
    {
      title: 'RESPs - Registered Education Savings Plans',
      content: (
        <p className="leading-relaxed">
          Plan ahead for education expenses with a tax-deferred savings plan that offers government grants and growth
          potential for a child&apos;s post-secondary education.
        </p>
      ),
    },
    {
      title: 'Universal Life Insurance',
      content: (
        <p className="leading-relaxed">
          Flexible life insurance with built-in investment options, designed to grow value over time while providing
          lifelong protection and estate planning benefits.
        </p>
      ),
    },
  ];

  // Motion
  const reduceMotion = useReducedMotion();

  const cardIn = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.55, ease: 'easeOut' },
      };

  const colIn = (delay = 0) =>
    reduceMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.45, ease: 'easeOut', delay },
        };

  // 2026 surface system (matches Contact)
  const pageBg = 'bg-[#f4f2ec]';

  const softCard =
    'rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm ' +
    'shadow-[0_14px_42px_rgba(0,0,0,0.08)] ' +
    'p-5 sm:p-6 lg:p-7';

  const h2 = 'font-sans text-2xl font-semibold tracking-tight text-[#0f5028]';

  const ctaBtn =
    'btn inline-flex items-center justify-center gap-2 ' +
    'w-full sm:w-auto ' +
    'px-5 py-3 rounded-xs ' +
    'bg-[#2f7a2e] hover:bg-[#3a8b34] ' +
    'text-white font-bold uppercase tracking-wide ' +
    'shadow-sm hover:shadow-md transition ' +
    'hover:shadow-[0_10px_22px_rgba(15,80,40,0.18)] ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25';

  return (
    <div className={`min-h-screen ${pageBg} text-[#1f2937] font-inter`}>
      {/* HERO — aligned with Contact “premium” system */}
      <section aria-label="Wealth page hero" className="relative">
        <div className="relative overflow-hidden">
          <img
            src={heroImage}
            alt="Investing for the future"
            loading="eager"
            decoding="async"
            className="
              w-full
              h-[clamp(250px,62vw,360px)]
              sm:h-[clamp(280px,36vw,420px)]
              lg:h-[clamp(280px,28vw,420px)]
              object-cover
              object-[58%_38%]
              saturate-[0.98]
              contrast-[1.02]
            "
          />

          {/* Readability wash */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,242,236,0.96),rgba(244,242,236,0.84),rgba(15,80,40,0.08))]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(0,0,0,0.12),transparent_56%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.14),transparent)]"
          />

          {/* Content */}
          <div className="absolute inset-0">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
              <div className="h-full flex items-center">
                <div className="relative -translate-y-3 sm:-translate-y-6 lg:-translate-y-4">
                  {/* Mobile glass pad keeps text premium + readable */}
                  <div className="rounded-2xl bg-white/35 backdrop-blur-sm border border-black/5 px-4 py-4 sm:p-0 sm:bg-transparent sm:backdrop-blur-0 sm:border-0">
                    <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#0f5028]">
                      Saving • Investing • Planning
                    </p>

                    <h1 className="mt-2.5 sm:mt-3 font-sans font-medium tracking-tight text-[#102019] leading-[1.05] text-[2.05rem] sm:text-5xl lg:text-6xl">
                      Secure Your Future
                      <br />
                      <span className="whitespace-nowrap">Through Investing</span>
                    </h1>

                    <p className="mt-3 text-[16px] sm:text-[16px] text-[#1f2937]/80 leading-relaxed max-w-[52ch]">
                      Thoughtful saving and investing can help protect your lifestyle today while building the assets
                      you&apos;ll rely on tomorrow.
                    </p>

                    <a
                      href="#main-content"
                      className="sr-only focus:not-sr-only focus:inline-flex focus:mt-4 focus:bg-white/85 focus:px-3 focus:py-2 focus:rounded-xs focus:outline-none focus:ring-2 focus:ring-[#0f5028]/30"
                    >
                      Skip to main content
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Soft fade into panel */}
        <div className="h-10 sm:h-12 bg-[linear-gradient(to_bottom,rgba(244,242,236,0.0),rgba(244,242,236,1))]" />
      </section>

      {/* CONTENT — upgraded to match Contact styling */}
      <main id="main-content" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-14">
        {/* Overlapping surface panel */}
        <div
          className="
            -mt-9 sm:-mt-14 lg:-mt-20
            rounded-[22px]
            border border-black/10
            bg-white/78
            backdrop-blur-md
            shadow-[0_22px_70px_rgba(0,0,0,0.10)]
            p-4 sm:p-6 lg:p-8
          "
        >
          <motion.section
            {...(cardIn || {})}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 lg:gap-10 xl:gap-12 items-start"
          >
            {/* LEFT */}
            <motion.article {...(colIn(0) || {})} className={softCard}>
              <LeadParagraph>
                Saving is the foundation of financial security. At McNeilly Financial Group, we emphasize thoughtful
                investing to protect your future, preserve capital, and grow wealth over time.
              </LeadParagraph>

              <div className="mt-5 h-px w-full bg-black/10" />

              <h2 className={`${h2} mt-5`}>Why Should I Save?</h2>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-[15px] sm:text-[16px] leading-relaxed text-[#1f2937]/85">
                <li>To protect against the unforeseen and uncontrollable</li>
                <li>To lower the risk of inflation depleting savings</li>
                <li>Because of decreased government pensions</li>
                <li>To acquire and grow assets</li>
                <li>To supplement other sources of income</li>
              </ul>

              <h2 className={`${h2} mt-8`}>An Investment Professional Can:</h2>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-[15px] sm:text-[16px] leading-relaxed text-[#1f2937]/85">
                <li>Help set clear and customized financial goals</li>
                <li>Assess your comfort with risk to build a suitable strategy</li>
                <li>Provide access to a range of investment solutions</li>
                <li>Optimize your tax efficiency</li>
                <li>Monitor, review, and adjust strategies over time</li>
              </ul>
            </motion.article>

            {/* RIGHT */}
            <motion.article {...(colIn(0.06) || {})} className={softCard}>
              <header>
                <h2 className={h2}>Our Investment Solutions Include:</h2>
                <p className="mt-2 text-[15px] sm:text-[16px] text-[#1f2937]/75 leading-relaxed">
                  Explore common options below. We’ll help you choose a strategy aligned with your goals, timeline, and
                  comfort with risk.
                </p>
              </header>

              <div className="mt-4 h-px w-full bg-black/10" />

              <AnimatePresence mode="wait">
                <motion.div key={activeIndex ?? -1} className="mt-4">
                  <div className="rounded-xl overflow-hidden border border-black/10 bg-white/60 backdrop-blur-sm">
                    {investmentOptions.map((item, index) => {
                      const isActive = activeIndex === index;

                      return (
                        <div key={index}>
                          <button
                            onClick={() => toggleAccordion(index)}
                            className={`
                              w-full flex justify-between items-center gap-4 px-4 py-3 text-left font-semibold transition-all duration-300
                              ${isActive ? 'bg-[#f0f6ea] text-[#0f5028]' : 'bg-white/70 text-[#0f5028] hover:bg-white/90'}
                              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f5028]/25
                            `}
                            aria-expanded={isActive}
                            aria-controls={`accordion-content-${index}`}
                          >
                            <span className="text-[15px] sm:text-[16px] leading-snug">{item.title}</span>
                            <motion.span
                              animate={{ rotate: isActive ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                              className="text-[16px] text-[#0f5028]"
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
                                transition={{ duration: 0.32, ease: 'easeOut' }}
                                className="px-4 pb-4 pt-3 text-[15px] sm:text-[16px] border-t border-black/10 bg-white/75 text-[#1f2937]/85"
                              >
                                {item.content}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {index < investmentOptions.length - 1 && !isActive && <div className="h-px bg-black/10" />}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#1f2937]/80">
                McNeilly Financial Group tailors investment strategies to meet your unique objectives, offering peace of
                mind through clarity, communication, and ongoing support.
              </p>

              {/* CTA */}
              <div className="mt-6">
                <button
                  onClick={handleContactClick}
                  className={ctaBtn}
                  aria-label="Contact us for a free consultation"
                >
                  <FaComments size={18} aria-hidden="true" />
                  Free Consultation
                </button>
              </div>
            </motion.article>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Wealth;