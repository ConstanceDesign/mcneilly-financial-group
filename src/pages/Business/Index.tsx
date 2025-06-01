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

// Import internal content components (ensure these export ReactNode)
import GroupInsuranceContent from './GroupInsuranceContent';
import DisabilityInsuranceContent from './DisabilityInsuranceContent';
import HealthInsuranceContent from './HealthInsuranceContent';
import BusinessOverheadContent from './BusinessOverheadContent';
import BuySellContent from './BuySellContent';
import KeyPersonContent from './KeyPersonContent';

type TabKey = 'group' | 'buySell' | 'keyPerson' | 'overhead' | 'disability' | 'health';

const tabs: { id: TabKey; label: string; icon: ReactNode }[] = [
  { id: 'group', label: 'Group Insurance', icon: <FaUsers /> },
  { id: 'buySell', label: 'Buy-Sell', icon: <FaHandshake /> },
  { id: 'keyPerson', label: 'Key Person', icon: <FaUserShield /> },
  { id: 'overhead', label: 'Business Overhead', icon: <FaFileInvoiceDollar /> },
  { id: 'disability', label: 'Disability Insurance', icon: <FaWheelchair /> },
  { id: 'health', label: 'Health Insurance', icon: <FaHeartbeat /> },
];

const tabComponents: Record<TabKey, ReactNode> = {
  group: <GroupInsuranceContent />,
  buySell: <BuySellContent />,
  keyPerson: <KeyPersonContent />,
  overhead: <BusinessOverheadContent />,
  disability: <DisabilityInsuranceContent />,
  health: <HealthInsuranceContent />,
};

const tabIcons: Record<TabKey, ReactNode> = {
  group: <FaUsers />,
  buySell: <FaHandshake />,
  keyPerson: <FaUserShield />,
  overhead: <FaFileInvoiceDollar />,
  disability: <FaWheelchair />,
  health: <FaHeartbeat />,
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
            Business Insurance Solutions
          </h1>
        </div>
      </section>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex justify-center flex-wrap gap-4 mb-10" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold flex items-center gap-3 mb-6">
                {tabIcons[activeTab]} {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              {tabComponents[activeTab]}
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Business;
