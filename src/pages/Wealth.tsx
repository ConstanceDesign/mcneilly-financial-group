import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from '../images/wealth-hero.jpg';
import LeadParagraph from 'components/LeadParagraph';
import { FaChevronDown, FaChevronUp, FaEnvelope } from 'react-icons/fa';

const Wealth: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const investmentOptions = [
    {
      title: 'GICs - Guaranteed Investment Certificates',
      content: (
        <>
          <p>A guaranteed investment vehicle with a fixed interest rate and guaranteed return of principal at maturity.</p>
          <p className="text-sm text-gray-600">RISK: CDIC-insured up to $100,000</p>
          <p className="text-sm text-gray-600">TAX: Taxable on interest earned</p>
        </>
      ),
    },
    {
      title: 'RRSPs - Registered Retirement Savings Plans',
      content: 'We offer both Traditional and Roth IRAs with investment strategies tailored to your goals and tax situation. Our advisors help you choose the right account type and investment mix.'
    },
    {
      title: 'RESPs - Registered Education Savings Plans',
      content: 'Plan ahead for educational expenses with tax-advantaged 529 plans. We help families save and invest wisely for their children’s future education.'
    },
    {
      title: 'Universal Life Insurance',
      content: 'Access a broad range of investment options including stocks, bonds, ETFs, and mutual funds. We’ll help you design a portfolio aligned with your goals and risk tolerance.'
    },
    {
      title: 'Managed Accounts',
      content: 'Let our experienced advisors handle the day-to-day investment decisions. We provide discretionary portfolio management tailored to your financial plan.'
    },
    {
      title: 'Annuities and Insurance',
      content: 'Explore income-generating and risk-management products to complement your investment strategy. We explain the benefits and trade-offs of each solution.'
    },
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
          <h1 className="text-5xl font-bold text-white drop-shadow-2xl px-4 py-2">
            Secure Your Future By Investing
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <main className="px-10 py-12 md:px-20 lg:py-16 max-w-7xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-2 lg:gap-30 md:gap-5 sm:gap-5">
          <article className="text-lg space-y-6 leading-relaxed">
            <LeadParagraph>
              Saving is the foundation of financial security. At McNeilly Financial Group, we emphasize thoughtful investing to protect your future, preserve capital, and grow wealth over time.
            </LeadParagraph>

            <h2 className="text-2xl font-semibold pt-6">Why Should I Save?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To protect against the unforeseen and uncontrollable</li>
              <li>To lower the risk of inflation depleting savings</li>
              <li>Because of decreased government pensions</li>
              <li>To acquire and grow assets</li>
              <li>To supplement other sources of income</li>
            </ul>

            <h2 className="text-2xl font-semibold pt-6">How Can an Investment Professional Help?</h2>
            <ul className="list-disc pl-6 space-y-2">
            <li>Help you set clear and customized financial goals</li>
              <li>Assess your comfort with risk and building a strategy</li>
              <li>Provide access to a range of investment solutions</li>
              <li>Optimize your tax efficiency</li>
              <li>Monitor, review, and adjust strategies over time</li>
            </ul>
          </article>

 {/* Right Column */}
          <article className="text-lg space-y-6 leading-relaxed md:pt-0">
            <h2 className="text-2xl pb-3 font-semibold">Our Investment Solutions Include:</h2>
            <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg space-y-6 leading-relaxed md:pt-0"
        >
          <div className="space-y-4 divide-y divide-lime-200 border border-lime-200 rounded-md overflow-hidden">
            {investmentOptions.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center p-4 text-left text-lime-900 hover:bg-lime-50 focus:outline-none focus-visible:ring focus-visible:ring-lime-300"
                  aria-expanded={activeIndex === index}
                  aria-controls={`accordion-content-${index}`}
                >
                  <span className="font-semibold">{item.title}</span>
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      key={`content-${index}`}
                      id={`accordion-content-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 text-lg text-gray-700 overflow-hidden"
                    >
                      {item.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.article>

        <p className="pt-1">
            McNeilly Financial Group tailors investment strategies to meet your unique objectives, offering peace of mind through clarity, communication, and ongoing support.
            </p>

            {/* CTA Button */}
            <div className="mt-8 pb-8">
              <Link
                to="/contact"
                aria-label="Schedule a consultation"
                className="relative flex-1 xl:w-2/3 group overflow-hidden px-6 py-5 rounded-xs text-lg text-[#333] font-bold tracking-wide flex justify-between items-center transition-all duration-300 hover:bg-[#62a342] hover:text-white shadow"
              >
                <span className="absolute inset-0 w-full h-full bg-[#c2e1a1] transition-transform duration-300 transform group-hover:translate-x-full group-hover:opacity-0"></span>
                <span className="relative z-10 flex items-center justify-between w-full">
                  <span>Schedule a Consultation</span>
                  <FaEnvelope className="text-xl ml-3" />
                </span>
              </Link>
            </div>
          </article>
        </section>

        {/* Accordion Section */}
        <section className="pt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Explore Investment Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'GICs - Guaranteed Investment Certificates',
                content: (
                  <>
                    <p>A guaranteed investment vehicle with a fixed interest rate and guaranteed return of principal at maturity.</p>
                    <p className="text-sm text-gray-600">RISK: CDIC-insured up to $60,000</p>
                    <p className="text-sm text-gray-600">TAX: Taxable on interest earned</p>
                  </>
                ),
              },
              {
                title: 'Labour Sponsored Funds',
                content: <p>Investment funds focusing on small-to-medium businesses in Canada, offering federal and provincial tax credits.</p>,
              },
              {
                title: 'RRSP - Registered Retirement Savings Plan',
                content: <p>A tax-advantaged account for retirement savings, reducing taxable income while growing wealth.</p>,
              },
              {
                title: 'Group RRSP',
                content: <p>Employer-sponsored RRSPs with payroll contributions and collective management benefits.</p>,
              },
              {
                title: 'RESP - Registered Education Savings Plan',
                content: (
                  <>
                    <p>A tax-deferred plan for post-secondary education savings with government grants and growth potential.</p>
                    <p className="text-sm text-gray-600">Average university cost: $74,000 (adjusted for inflation)</p>
                  </>
                ),
              },
              {
                title: 'Universal Life Insurance',
                content: <p>Flexible life insurance with built-in investment options to grow value alongside protection.</p>,
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow">
                <button
                  className="w-full text-left p-4 font-semibold text-lg bg-gray-200 rounded-t-lg focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  {item.title}
                </button>
                {activeIndex === index && (
                  <div className="p-4 text-lg text-gray-700">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Wealth;