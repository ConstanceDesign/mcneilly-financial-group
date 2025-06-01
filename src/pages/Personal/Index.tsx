import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUsers,
  FaHandshake,
  FaKey,
  FaBuilding,
  FaWheelchair,
  FaHeartbeat,
} from 'react-icons/fa';
import heroImage from '../../images/business-hero.jpg';

type TabKey = 'group' | 'buySell' | 'keyPerson' | 'overhead' | 'disability' | 'health';

const tabs = [
  { id: 'group', label: 'Critical Illness', icon: <FaUsers /> },
  { id: 'buySell', label: 'Mortgage', icon: <FaHandshake /> },
  { id: 'keyPerson', label: 'Term', icon: <FaKey /> },
  { id: 'overhead', label: 'Permanent', icon: <FaBuilding /> },
  { id: 'disability', label: 'Disability', icon: <FaWheelchair /> },
  { id: 'health', label: 'Health', icon: <FaHeartbeat /> },
];

const tabData: Record<TabKey, { title: string; content: ReactNode; image: string }> = {
  group: {
    title: 'Group Insurance',
    image: '../../images/group-insurance.jpg',
    content: (
      <>
        <p className="mb-4">A strong group insurance plan is one of the best ways to attract and retain top talent.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Boosts employee satisfaction and loyalty</li>
          <li>Flexible, cost-effective plans</li>
          <li>Covers employees and their dependents</li>
        </ul>
      </>
    ),
  },
  buySell: {
    title: 'Buy-Sell Agreements',
    image: '/images/buy-sell-agreement.jpg',
    content: (
      <>
        <p className="mb-4">A Buy-Sell agreement funded with life insurance ensures that business ownership transitions smoothly if a partner passes away.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Ensures liquidity for succession</li>
          <li>Prevents disputes among heirs and partners</li>
          <li>Keeps operations running smoothly</li>
        </ul>
      </>
    ),
  },
  keyPerson: {
    title: 'Term Insurance',
    image: '/images/key-person.jpg',
    content: (
      <>
        <p className="mb-4">Key Person Insurance protects your business from the loss of critical staff.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Protects revenue and business continuity</li>
          <li>Funds recruitment and training</li>
          <li>Retains key employees</li>
        </ul>
      </>
    ),
  },
  overhead: {
    title: 'Permanent Insurance',
    image: '/images/business-overhead.jpg',
    content: (
      <>
        <p className="mb-4">This insurance pays for business expenses while you recover from illness or injury.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>May be tax-deductible</li>
          <li>Covers rent, salaries, utilities</li>
          <li>Maintains cash flow during recovery</li>
        </ul>
      </>
    ),
  },
  disability: {
    title: 'Disability Insurance',
    image: '/images/disability-insurance.jpg',
    content: (
      <>
        <p className="mb-4">Protects your income if you're unable to work due to injury or illness.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2">Disability Risk by Age</h3>
        <table className="min-w-full text-md border mt-2">
          <thead className="bg-[#127038]">
            <tr><th className="py-1 px-2 text-white font-semibold">Age</th><th className="py-1 px-2 text-white font-semibold">Male</th><th className="py-1 px-2 text-white font-semibold">Female</th></tr>
          </thead>
          <tbody>
            <tr><td className="bg-gray-100 py-1 px-2 text-center">25</td><td className="bg-gray-100 py-1 px-2 text-center">40.7%</td><td className="bg-gray-100 not-last-of-type:py-1 px-2 text-center">46.8%</td></tr>
            <tr><td className="bg-gray-100 py-1 px-2 text-center">30</td><td className="bg-gray-100 py-1 px-2 text-center">38.9%</td><td className="bg-gray-100 py-1 px-2 text-center">44.6%</td></tr>
            <tr><td className="bg-gray-100 py-1 px-2 text-center">35</td><td className="bg-gray-100 py-1 px-2 text-center">37.1%</td><td className="bg-gray-100 py-1 px-2 text-center">41.9%</td></tr>
            <tr><td className="bg-gray-100 py-1 px-2 text-center">40</td><td className="bg-gray-100 py-1 px-2 text-center">35.1%</td><td className="bg-gray-100 py-1 px-2 text-center">38.3%</td></tr>
          </tbody>
        </table>
      </>
    ),
  },
  health: {
    title: 'Health Insurance',
    image: '/images/health-insurance.jpg',
    content: (
      <>
        <p className="mb-4">Health insurance provides essential protection against medical expenses.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Look for high lifetime coverage</li>
          <li>Tax-advantaged plans for small businesses</li>
          <li>Best to enroll while healthy</li>
        </ul>
      </>
    ),
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const Business: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('group');

  return (
    <div className="text-[#333] font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2d6a4f] to-[#95d5b2] text-white h-96 flex items-center justify-center">
        <img
          src={heroImage}
          alt="Business Insurance Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl text-white font-bold drop-shadow-2xl text-center px-4 py-2">
            Personal Insurance Solutions
          </h1>
        </div>
      </section>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex justify-center flex-wrap gap-4 mb-10" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabKey)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 md:text-base font-semibold uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-accent text-[#0a4020] border-accent'
                  : 'border-[#8cbe3f] text-[#127038] hover:bg-mutedGreen hover:text-[#8cbe3f] hover:border-mutedGreen'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            id={`${activeTab}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeTab}-tab`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInUp}
            transition={{ duration: 0.4 }}
            className="bg-[#c2e1a1] p-6 rounded-lg shadow-sm"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">{tabData[activeTab].title}</h2>
                {tabData[activeTab].content}
              </div>
              <div className="lg:w-1/2">
                <img
                  src={tabData[activeTab].image}
                  alt={tabData[activeTab].title}
                  className="rounded-lg shadow-lg w-full h-auto max-h-[300px] object-cover"
                />
              </div>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Business;