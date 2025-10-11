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
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const investmentOptions = [
    {
      title: 'GICs - Guaranteed Investment Certificates',
      content: (
        <>
          <p>A guaranteed investment vehicle with a fixed interest rate and guaranteed return of principal at maturity.</p>
          <p className="mt-3 text-sm font-semibold text-[#4b9328]">RISK: CDIC-insured up to $100,000</p>
          <p className="mt-1 text-sm font-semibold text-[#4b9328]">TAX: Taxable on interest earned</p>
        </>
      ),
    },
    {
      title: 'Bonds',
      content: 'Fixed-income investments where you lend money to a government or corporation in exchange for regular interest payments and the return of your principal at maturity.'
    },
    {
      title: 'Segregated Funds',
      content: 'Insurance-based investment products that offer market growth potential like mutual funds, but with added benefits such as death benefit guarantees and creditor protection.'
    },
    {
      title: 'Mutual Funds',
      content: 'Investment pools managed by professionals that combine money from many investors to buy a diversified portfolio of stocks, bonds, or other securities.'
    },
    {
      title: 'RRSPs - Registered Retirement Savings Plans',
      content: 'A tax-advantaged account for retirement savings, reducing taxable income while growing wealth.'
    },
    {
      title: 'Group RRSPs - Employer-Sponsored',
      content: 'Employer-sponsored RRSPs with payroll contributions and collective management benefits.'
    },
    {
      title: 'RESPs - Registered Education Savings Plans',
      content: 'Plan ahead for educational expenses with a tax-deferred plan for post-secondary education savings with government grants and growth potential.'
    },
    {
      title: 'Universal Life Insurance',
      content: 'Flexible life insurance with built-in investment options to grow value alongside protection.'
    }
  ];

  return (
    <div className="text-[#333] font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-[#1f7a45] text-white">
        <img
          src={heroImage}
          alt="Investing for the future"
          loading="lazy"
          className="h-full w-full object-cover opacity-25 absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-96 px-4">
          <h1 className="text-[2.4rem] font-serif leading-tight md:text-6xl md:leading-[1.1] font-bold drop-shadow-sm text-white px-4 py-2">
            Secure Your Future By Investing
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <main className="px-10 py-12 md:px-20 lg:py-16 max-w-7xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 lg:gap-30 md:gap-5 sm:gap-5"
        >
          {/* Left Column */}
          <article className="text-lg space-y-6 leading-relaxed">
            <LeadParagraph>
              Saving is the foundation of financial security. At McNeilly Financial Group, we emphasize thoughtful investing to protect your future, preserve capital, and grow wealth over time.
            </LeadParagraph>

            <h2 className="text-2xl font-serif font-semibold pt-10">Why Should I Save?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To protect against the unforeseen and uncontrollable</li>
              <li>To lower the risk of inflation depleting savings</li>
              <li>Because of decreased government pensions</li>
              <li>To acquire and grow assets</li>
              <li>To supplement other sources of income</li>
            </ul>

            <h2 className="text-2xl font-serif font-semibold pt-6">An Investment Professional Can:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Help set clear and customized financial goals</li>
              <li>Assess your comfort with risk to build a strategy</li>
              <li>Provide access to a range of investment solutions</li>
              <li>Optimize your tax efficiency</li>
              <li>Monitor, review, and adjust strategies over time</li>
            </ul>
          </article>

          {/* Right Column */}
          <article className="text-lg space-y-6 leading-relaxed pt-10 sm:pt-8 md:pt-8 lg:pt-0">
            <h2 className="text-2xl pb-3 font-serif font-semibold">Our Investment Solutions Include:</h2>

            <AnimatePresence mode="wait">
              <motion.article
                key={activeIndex}
                className="text-lg space-y-6 leading-relaxed md:pt-0"
              >
                <div className="border-2 border-[#c2e1a1] rounded-xs overflow-hidden">
                  {investmentOptions.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <div key={index}>
                        <button
                          onClick={() => toggleAccordion(index)}
                          className={`
                            w-full flex justify-between items-center p-3.75 text-left font-bold transition-all duration-300 group
                            ${isActive ? 'bg-[#dceec3] text-[#0f5028] text-lg' : 'text-[#4b9328]'}
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c2e1a1]
                          `}
                          aria-expanded={isActive}
                          aria-controls={`accordion-content-${index}`}
                        >
                          <span className="transition-colors duration-300 group-hover:no-underline">
                            {item.title}
                          </span>
                          <motion.span
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-xl"
                          >
                            <FaChevronDown />
                          </motion.span>
                        </button>

                        {isActive && (
                          <div className="border-t-2 border-[#c2e1a1]" />
                        )}

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              key={`content-${index}`}
                              id={`accordion-content-${index}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              className="p-4 text-lg overflow-hidden"
                            >
                              {item.content}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {index < investmentOptions.length - 1 && (
                          <div className="border-t-2 border-[#c2e1a1]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.article>
            </AnimatePresence>

            <p className="pt-2">
              McNeilly Financial Group tailors investment strategies to meet your unique objectives, offering peace of mind through clarity, communication, and ongoing support.
            </p>

            {/* CTA Button */}

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleContactClick}
                className="flex items-center justify-center gap-2 bg-[#4b9328] hover:bg-[#8cbe3f] text-white hover:text-white tracking-wide px-3 py-2 rounded-xs font-bold text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 duration-300 hover:scale-105"
                aria-label="Contact us for a free consultation"
              ><FaComments size={20} />
               <span className="tracking-wide text-[1.10rem] uppercase">Free Consultation</span>
              </button>

            </div>
          </article>
        </motion.section>
      </main>
    </div>
  );
};

export default Wealth;