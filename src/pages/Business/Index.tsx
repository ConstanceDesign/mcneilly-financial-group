import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import heroImage from '../../images/business-hero.jpg';

const Business: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0); // Manage the active tab
  <div><h1>Business Insurance</h1><Outlet /></div>

  // Tab Content
  const tabs = [
    {
      title: 'Overview',
      content: (
        <>
          <p>
            If personal insurance is mind-boggling, then business insurance is undoubtedly even more complex. Over 90% of our clients are business/professional individuals, making us experts in servicing the Ontario market.
          </p>
          <p>
            The process is highly technical, requiring full disclosure of financial statements, partnership agreements, and other documents. It's best to involve your accountant, lawyer, and advisor in the process to safeguard against any potential conflicts of interest.
          </p>
          <p>
            The most critical concern is ensuring that living benefits are in place for key people in your business. The last thing you want is a key individual getting sick or injured.
          </p>
        </>
      ),
    },
    {
      title: 'Business Insurance Solutions',
      content: (
        <>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Group Insurance</li>
            <li>Buy/Sell</li>
            <li>Key Person</li>
            <li>Business Overhead</li>
            <li>Business Disability Insurance</li>
            <li>Business Health Insurance</li>
          </ul>
        </>
      ),
    },
    // More tabs as needed...
  ];

  return (
    <>
        <title>Business Insurance Solutions | McNeilly Financial Group</title>
        <meta name="description" content="Explore comprehensive business insurance solutions to safeguard your company's future." />
        <meta name="keywords" content="business insurance, group insurance, key person insurance, buy/sell insurance, disability insurance" />
        <meta property="og:title" content="Business Insurance Solutions | McNeilly Financial Group" />
        <meta property="og:description" content="Learn about business insurance options including key person insurance, group insurance, and more." />
        <meta property="og:image" content="/images/business-hero.jpg" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-[#1f7a45] text-white">
        <img
          src={heroImage}
          alt="Explore trusted links to financial resources."
          loading="lazy"
          className="h-full w-full object-cover opacity-25 absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-96 px-4">
          <h1 className="text-5xl font-bold text-white drop-shadow-2xl px-4 py-2">
            Business Insurance Solutions
          </h1>
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

    </>
  );
};

export default Business;