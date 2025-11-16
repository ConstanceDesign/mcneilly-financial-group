import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUsers,
  FaHandshake,
  FaUserShield,
  FaWheelchair,
  FaHeartbeat,
  FaFileInvoiceDollar,
} from 'react-icons/fa';
import heroImage from '../../images/business-hero.jpg';

// Import internal content components
import GroupInsurance from './GroupInsurance';
import BusinessDisabilityInsurance from './BusinessDisabilityInsurance';
import BusinessHealthInsurance from './BusinessHealthInsurance';
import BusinessOverhead from './BusinessOverhead';
import BuySell from './BuySell';
import KeyPerson from './KeyPerson';

type TabKey = 'group' | 'buySell' | 'keyPerson' | 'overhead' | 'disability' | 'health';

const tabs: { id: TabKey; label: string; icon: ReactNode }[] = [
  { id: 'group', label: 'Group Insurance', icon: <FaUsers /> },
  { id: 'buySell', label: 'Buy-Sell', icon: <FaHandshake /> },
  { id: 'keyPerson', label: 'Key Person', icon: <FaUserShield /> },
  { id: 'overhead', label: 'Business Overhead', icon: <FaFileInvoiceDollar /> },
  { id: 'disability', label: 'Disability', icon: <FaWheelchair /> },
  { id: 'health', label: 'Health', icon: <FaHeartbeat /> },
];

const tabComponents: Record<TabKey, ReactNode> = {
  group: <GroupInsurance />,
  buySell: <BuySell />,
  keyPerson: <KeyPerson />,
  overhead: <BusinessOverhead />,
  disability: <BusinessDisabilityInsurance />,
  health: <BusinessHealthInsurance />,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 16 },
};

const Business: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('group');

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-[#333] font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0f5028] to-[#4b9328] text-white h-80 md:h-96 flex items-center justify-center">
        <img
          src={heroImage}
          alt="Business owners reviewing insurance plans"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-[2rem] md:text-5xl lg:text-6xl font-bold leading-tight md:leading-[1.1] drop-shadow-sm">
            Business Insurance Solutions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#e8f7e1]">
            Protect your company, your partners, and your team with coordinated strategies for
            benefits, income protection, and succession planning.
          </p>
        </div>
      </section>

      {/* Tabs + Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-10" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${tab.id}-panel`}
                id={`${tab.id}-tab`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f] ${
                  isActive
                    ? 'bg-[#4b9328] text-white border-[#4b9328] shadow-md hover:bg-[#8cbe3f] hover:border-[#8cbe3f] hover:scale-105'
                    : 'bg-white text-[#0f5028] border-[#8cbe3f] hover:bg-[#8cbe3f] hover:text-white hover:border-[#8cbe3f] hover:scale-105'
                }`}
              >
                <span className="text-base md:text-lg" aria-hidden="true">
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
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
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-white border border-[#d0d0d0] p-6 md:p-8 rounded-xl shadow-md"
          >
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Inner components render their own headings; no extra H2 here */}
              {tabComponents[activeTab]}
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Business;