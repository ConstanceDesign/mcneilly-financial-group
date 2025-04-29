import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import 'index.css';

const Wealth: React.FC = () => {
  // State for managing expanded/collapsed accordion sections
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle between expanding and collapsing
  };

  return (
    <>
      <Navbar /> {/* Include Navbar */}
      <Helmet>
        <title>Why Should I Save? | McNeilly Financial Group</title>
        <meta
          name="description"
          content="Explore why saving for your future is essential, and discover different investment options to secure your financial well-being."
        />
        <meta
          name="keywords"
          content="investment planning, financial savings, GICs, RRSP, RESP, mutual funds, investment professional"
        />
        <meta property="og:title" content="Why Should I Save? | McNeilly Financial Group" />
        <meta
          property="og:description"
          content="Learn the importance of saving, investment options, and how an investment professional can help you secure your future."
        />
        <meta property="og:image" content="/images/wealth-hero.jpg" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gray-200">
        <img
          src="/images/wealth-hero.jpg" 
          alt="Investing for the future"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <h1 className="text-4xl text-white font-bold text-center px-4 py-2">Secure Your Future Through Smart Saving and Investing</h1>
        </div>
      </section>

      <div className="container mx-auto p-6">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Why Should I Save?</h2>
          <p className="text-lg mb-4">
            Saving is a crucial step in securing your future and maintaining financial stability. Here are some key reasons why saving is essential:
          </p>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Protection Against the Unforeseen & Uncontrollable</li>
            <li>Risk of Inflation Depleting Savings</li>
            <li>Decreased Government Pensions</li>
            <li>Assist in Acquiring and Growing Assets</li>
            <li>Supplement Other Sources of Income</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">What Type of Investments Are Available?</h2>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Guaranteed Investment Certificates (GICs)</li>
            <li>Bonds</li>
            <li>Segregated Funds</li>
            <li>Mutual Funds</li>
            <li>Labour Sponsored Funds</li>
            <li>RRSPs, Group RRSPs</li>
            <li>RESPs</li>
            <li>Universal Life Insurance</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">How Can an Investment Professional Assist Me?</h2>
          <p className="text-lg mb-4">
            An investment professional can guide you through various aspects of investment planning, including:
          </p>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Setting Objectives: Helping you and your family decide on your investment objectives and prioritize them</li>
            <li>Setting Goals: Establishing financial, lifestyle, business, and personal goals</li>
            <li>Optimizing Your Tax Situation: Exploring various options and their tax implications</li>
            <li>Assessing Risk: Determining your risk tolerance and selecting investments that match your comfort level</li>
            <li>Providing Resources: Offering access to diverse investment vehicles and expert advice</li>
            <li>Ongoing Monitoring: Regularly reviewing your investments to ensure they align with your evolving goals</li>
          </ul>
        </section>

        {/* Accordion for Detailed Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Explore Investment Options</h2>
          <div className="space-y-4">
            {/* GIC Accordion */}
            <div className="bg-gray-100 rounded-lg shadow">
              <button
                className="w-full text-left p-4 font-semibold text-lg bg-gray-200 rounded-t-lg focus:outline-none"
                onClick={() => toggleAccordion(0)}
              >
                GICs - Guaranteed Investment Certificates
              </button>
              {activeIndex === 0 && (
                <div className="p-4 text-lg text-gray-700">
                  <p>A guaranteed investment vehicle with a fixed interest rate and guaranteed return of principal at maturity.</p>
                  <p className="text-sm text-gray-600">RISK: CDIC-insured up to $60,000</p>
                  <p className="text-sm text-gray-600">TAX: Taxable on interest earned</p>
                </div>
              )}
            </div>

            {/* Labour Sponsored Funds Accordion */}
            <div className="bg-gray-100 rounded-lg shadow">
              <button
                className="w-full text-left p-4 font-semibold text-lg bg-gray-200 rounded-t-lg focus:outline-none"
                onClick={() => toggleAccordion(1)}
              >
                Labour Sponsored Funds
              </button>
              {activeIndex === 1 && (
                <div className="p-4 text-lg text-gray-700">
                  <p>Investment funds focusing on small-to-medium businesses in Canada, offering significant federal and provincial tax credits.</p>
                </div>
              )}
            </div>

            {/* RRSP Accordion */}
            <div className="bg-gray-100 rounded-lg shadow">
              <button
                className="w-full text-left p-4 font-semibold text-lg bg-gray-200 rounded-t-lg focus:outline-none"
                onClick={() => toggleAccordion(2)}
              >
                RRSP - Registered Retirement Savings Plan
              </button>
              {activeIndex === 2 && (
                <div className="p-4 text-lg text-gray-700">
                  <p>A tax-advantaged account for Canadians to save for retirement, reducing taxable income while growing wealth.</p>
                </div>
              )}
            </div>

            {/* Group RRSP Accordion */}
            <div className="bg-gray-100 rounded-lg shadow">
              <button
                className="w-full text-left p-4 font-semibold text-lg bg-gray-200 rounded-t-lg focus:outline-none"
                onClick={() => toggleAccordion(3)}
              >
                Group RRSP - Group Registered Retirement Savings Plan
              </button>
              {activeIndex === 3 && (
                <div className="p-4 text-lg text-gray-700">
                  <p>A collection of individual RRSPs for employees of a company, with contributions made through payroll deductions.</p>
                </div>
              )}
            </div>

            {/* RESP Accordion */}
            <div className="bg-gray-100 rounded-lg shadow">
              <button
                className="w-full text-left p-4 font-semibold text-lg bg-gray-200 rounded-t-lg focus:outline-none"
                onClick={() => toggleAccordion(4)}
              >
                RESP - Registered Education Savings Plan
              </button>
              {activeIndex === 4 && (
                <div className="p-4 text-lg text-gray-700">
                  <p>A tax-deferred savings plan to save for a child's post-secondary education, with government contributions and tax benefits.</p>
                  <p className="text-sm text-gray-600">Estimated cost of a university degree: $74,000 (adjusted for inflation)</p>
                </div>
              )}
            </div>

            {/* Universal Life Accordion */}
            <div className="bg-gray-100 rounded-lg shadow">
              <button
                className="w-full text-left p-4 font-semibold text-lg bg-gray-200 rounded-t-lg focus:outline-none"
                onClick={() => toggleAccordion(5)}
              >
                Universal Life Insurance
              </button>
              {activeIndex === 5 && (
                <div className="p-4 text-lg text-gray-700">
                  <p>A flexible life insurance policy that combines life coverage with an investment component, allowing for adjustments over time.</p>
                </div>
              )}
            </div>

          </div>
        </section>
      <Footer /> {/* Include Footer */} 
      </div>
    </>
  );
};

export default Wealth;