import React, { useMemo, useRef, useState, ReactNode } from 'react';
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const Business: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('group');

  // Refs for keyboard navigation between tabs (ArrowLeft / ArrowRight)
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    group: null,
    buySell: null,
    keyPerson: null,
    overhead: null,
    disability: null,
    health: null,
  });

  const orderedIds = useMemo(() => tabs.map((t) => t.id), []);

  const focusTab = (id: TabKey) => {
    tabRefs.current[id]?.focus();
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return;

    e.preventDefault();
    const currentIndex = orderedIds.indexOf(activeTab);

    if (e.key === 'Home') {
      setActiveTab(orderedIds[0]);
      focusTab(orderedIds[0]);
      return;
    }

    if (e.key === 'End') {
      const last = orderedIds[orderedIds.length - 1];
      setActiveTab(last);
      focusTab(last);
      return;
    }

    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (currentIndex + dir + orderedIds.length) % orderedIds.length;
    const nextId = orderedIds[nextIndex];
    setActiveTab(nextId);
    focusTab(nextId);
  };

  // Page background aligned to the “paper” vibe you liked (pairs well with footer polish)
  const pageBg = 'bg-[#f4f2ec]';

  // Premium pill styling (still your fun pills — just more “material”, less “buttony”)
  const pillBase =
    'relative inline-flex items-center gap-2 ' +
    'px-4 py-2 rounded-full border ' +
    'text-[11px] md:text-xs font-bold uppercase tracking-widest ' +
    'transition ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f5028]/25';

  const pillInactive =
    'bg-white/55 backdrop-blur-[1px] ' +
    'border-black/10 text-[#0f5028]/85 ' +
    'hover:bg-white/70 hover:border-black/15 ' +
    'hover:text-[#0f5028]';

  const pillActive =
    'bg-[#0f5028] text-white ' +
    'border-[#0f5028] ' +
    'shadow-[0_8px_22px_rgba(15,80,40,0.18)]';

  return (
    <div className={`min-h-screen ${pageBg} text-[#1f2937] font-inter`}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Image */}
        <img
          src={heroImage}
          alt="Business owners reviewing insurance plans"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* Warm editorial wash (reduces the “frog overlay” effect) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,242,236,0.92),rgba(244,242,236,0.80),rgba(15,80,40,0.14))]"
        />

        {/* Subtle darkening at the far right edge to keep contrast stable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_85%_35%,rgba(0,0,0,0.10),transparent_55%)]"
        />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16 lg:py-18">
            <p className="text-[12px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#0f5028]">
              Business Coverage • Benefits • Continuity Planning
            </p>

            <h1 className="mt-3 text-[2.25rem] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#102019]">
              Business Insurance
            </h1>

            <p className="mt-5 max-w-xl text-[15.5px] sm:text-base text-[#1f2937]/75 leading-relaxed">
              Protect your company, your partners, and your team with coordinated strategies for benefits, income
              protection, and succession planning.
            </p>
          </div>
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
              {/* Inner components handle their own headings */}
              {tabComponents[activeTab]}
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Business;