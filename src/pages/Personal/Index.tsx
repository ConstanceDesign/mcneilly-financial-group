import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import 'index.css';


const Personal: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0); // Manage the active tab

  // Tab Content
  const tabs = [
    {
      title: 'Overview',
      content: (
        <>
          <p>
            At McNeilly Financial Group, we understand that every individual's insurance needs are unique. Circumstances differ, and your medical history will affect your options.
          </p>
          <p>
            Insurance can be costly, and it's crucial to prioritize your needs. While you may not afford the best option for every requirement, it's essential to have a strategy that covers the most significant risks.
          </p>
          <p>
            We recommend focusing on living benefits first, as the ratio of accident and sickness claims versus death claims is 9:1. It's essential to revisit your insurance plan every 3 years or whenever major life changes occur.
          </p>
        </>
      ),
    },
    {
      title: 'Personal Insurance Solutions',
      content: (
        <>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Term Insurance</li>
            <li>Critical Illness</li>
            <li>Health Insurance</li>
            <li>Disability Insurance</li>
            <li>Mortgage Insurance</li>
            <li>Permanent Insurance</li>
          </ul>
        </>
      ),
    },
    // More tabs as needed...
  ];

  return (
    <>
      <Helmet>
        <title>Personal Insurance Solutions | McNeilly Financial Group</title>
        <meta name="description" content="Explore personal insurance solutions, including term life insurance, disability coverage, and more." />
        <meta name="keywords" content="personal insurance, term insurance, critical illness, disability insurance, mortgage insurance" />
        <meta property="og:title" content="Personal Insurance Solutions | McNeilly Financial Group" />
        <meta property="og:description" content="Find out how personal insurance can protect you and your loved ones against financial risks." />
        <meta property="og:image" content="/images/personal-hero.jpg" />
      </Helmet>

      <Navbar /> {/* Include Navbar */}

      {/* Hero Section */}
      <section className="relative bg-gray-200">
        <img
          src="/images/personal-hero.jpg" // Replace with actual path to the hero image
          alt="Personal Insurance Solutions"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <h1 className="text-4xl text-white font-bold text-center px-4 py-2">Personal Insurance Solutions</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="flex space-x-6">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`px-6 py-2 text-lg font-semibold ${activeTab === index ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          <div>{tabs[activeTab].content}</div>
        </div>
      </div>

      <Footer /> {/* Include Footer */}
    </>
  );
};

export default Personal;