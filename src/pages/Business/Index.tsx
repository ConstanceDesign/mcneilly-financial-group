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

const panelMotion = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 14 },
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
          className="
            absolute inset-0
            bg-[linear-gradient(90deg,rgba(244,242,236,0.92),rgba(244,242,236,0.80),rgba(15,80,40,0.14))]
          "
        />

        {/* Subtle darkening at the far right edge to keep contrast stable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_85%_35%,rgba(0,0,0,0.10),transparent_55%)]"
        />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16 lg:py-18">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#1f2937]/55">
              Business Coverage • Benefits • Continuity Planning
            </p>

            <h1 className="mt-3 text-[2.25rem] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#102019]">
              Business Insurance
              <br className="hidden sm:block" />
              Solutions
            </h1>

            <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#1f2937]/70 leading-relaxed">
              Protect your company, your partners, and your team with coordinated strategies for benefits, income
              protection, and succession planning.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs + Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
        {/* Tabs (LEFT aligned) */}
        <div className="pt-8">
          <div
            role="tablist"
            aria-label="Business insurance categories"
            onKeyDown={onTabKeyDown}
            className="flex flex-wrap items-center gap-3 md:gap-4 justify-start"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  id={`${tab.id}-tab`}
                  className={`${pillBase} ${isActive ? pillActive : pillInactive}`}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <span
                    className={`text-base md:text-[18px] ${isActive ? 'text-white/90' : 'text-[#0f5028]/55'}`}
                    aria-hidden="true"
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>

                  {/* Active “sheen” for premium feel */}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none absolute inset-0 rounded-full
                        bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent_55%)]
                      "
                    />
                  ) : null}
                </motion.button>
              );
            })}
          </div>

          <p className="mt-4 text-sm text-[#1f2937]/55">
            Choose a category to explore coverage details, planning notes, and common use cases.
          </p>
        </div>

        {/* ✅ Removed: the empty rectangular “mystery box” */}
        <div className="mt-8 h-px bg-black/5" aria-hidden="true" />

        {/* Content: airy + section-based (tab components will handle internal spacing) */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            id={`${activeTab}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeTab}-tab`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelMotion}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="mt-10"
          >
            {tabComponents[activeTab]}
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Business;