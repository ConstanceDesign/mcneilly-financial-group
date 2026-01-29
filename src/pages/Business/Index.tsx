import React, { useMemo, useRef, useState, ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  { id: 'group', label: 'Group Insurance', icon: null },
  { id: 'buySell', label: 'Buy-Sell', icon: null },
  { id: 'keyPerson', label: 'Key Person', icon: null },
  { id: 'overhead', label: 'Business Overhead', icon: null },
  { id: 'disability', label: 'Disability', icon: null },
  { id: 'health', label: 'Health', icon: null },
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
  exit: { opacity: 0, y: 14 },
};

const Business: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('group');

  // Reduce motion
  const reduceMotion = useReducedMotion();

  // Refs for keyboard navigation between tabs (ArrowLeft / ArrowRight / Home / End)
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

  // 2026 surface system (aligned with Contact)
  const pageBg = 'bg-[#f4f2ec]';

  const softCard =
    'rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm ' +
    'shadow-[0_14px_42px_rgba(0,0,0,0.08)] ' +
    'p-5 sm:p-6 lg:p-7';

  // Tabs (pills) — refined + premium (no icons)
 const tabBase =
  'inline-flex items-center justify-center rounded-full border-2 px-4 py-2 ' +
  'text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.14em] ' +
  'transition-all duration-300 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f5028]/25';

const tabActive =
  'bg-[#2f7a2e] text-white border-[#2f7a2e] shadow-sm ' +
  'hover:bg-[#3a8b34] hover:border-[#3a8b34] hover:scale-[1.02]';

const tabIdle =
  'bg-white/80 text-[#0f5028] border-[#2f7a2e]/35 ' +
  'hover:bg-white hover:border-[#2f7a2e]/55 hover:scale-[1.02]';

  // Motion
  const cardIn = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, ease: 'easeOut' },
      };

  return (
    <div className={`min-h-screen ${pageBg} text-[#1f2937] font-inter`}>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:z-50"
      >
        Skip to main content
      </a>

      {/* HERO — Contact model */}
      <section aria-label="Business page hero" className="relative">
        <div className="relative overflow-hidden">
          <img
            src={heroImage}
            alt="Business owners reviewing insurance plans"
            className="
              w-full
              h-[clamp(250px,62vw,360px)]
              sm:h-[clamp(280px,36vw,420px)]
              lg:h-[clamp(280px,28vw,420px)]
              object-cover
              object-[64%_36%]
              sm:object-[66%_38%]
              lg:object-[70%_38%]
              xl:object-[72%_36%]
              saturate-[0.98]
              contrast-[1.02]
            "
            loading="eager"
            decoding="async"
          />

          {/* Premium wash: strong left readability + softer right falloff */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,242,236,0.96),rgba(244,242,236,0.84),rgba(15,80,40,0.08))]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(0,0,0,0.12),transparent_56%)]"
          />

          {/* Subtle top vignette so hero tucks under nav */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.14),transparent)]"
          />

          {/* Content */}
          <div className="absolute inset-0">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
              <div className="h-full flex items-center">
                <div className="relative -translate-y-3 sm:-translate-y-6 lg:-translate-y-4">
                  {/* Mobile “glass” pad so text never fights image */}
                  <div className="rounded-2xl bg-white/35 backdrop-blur-sm border border-black/5 px-4 py-4 sm:p-0 sm:bg-transparent sm:backdrop-blur-0 sm:border-0">
                    <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#0f5028]">
                      Business Coverage • Benefits • Continuity
                    </p>

                    <h1 className="mt-2.5 sm:mt-3 font-sans font-medium tracking-tight text-[#102019] leading-[1.05] text-[2.05rem] sm:text-5xl lg:text-6xl">
                      Protect Your
                      <br />
                      <span className="whitespace-nowrap">Business Interests</span>
                    </h1>

                    <p className="mt-3 text-[16px] sm:text-[16px] text-[#1f2937]/80 leading-relaxed max-w-[44ch]">
                      Structured coverage for partners, key people, and teams
                      designed to support stability and continuity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Soft fade into the panel area */}
        <div className="h-10 sm:h-12 bg-[linear-gradient(to_bottom,rgba(244,242,236,0.0),rgba(244,242,236,1))]" />
      </section>

      {/* MAIN — overlap panel (Contact model) */}
      <main id="main-content" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-14">
        <div
          className="
            -mt-9 sm:-mt-14 lg:-mt-20
            rounded-[22px]
            border border-black/10
            bg-white/78
            backdrop-blur-md
            shadow-[0_22px_70px_rgba(0,0,0,0.10)]
            p-4 sm:p-6 lg:p-8
          "
        >
          <motion.section {...(cardIn || {})} className="grid gap-6 sm:gap-7">
            {/* Tabs */}
            <section className={`${softCard}`}>
<header className="text-center mb-6 sm:mb-8">
                <h2 className="font-sans text-[1.55rem] sm:text-2xl font-semibold tracking-tight text-[#0f5028]">
                  Explore coverage options
                </h2>
                <p className="mt-2 text-[15px] sm:text-[16px] text-[#1f2937]/70 leading-relaxed max-w-[68ch] mx-auto">
                  Select a category to view details. Use Arrow keys to move between tabs.
                </p>
              </header>

<div
  className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4"
  role="tablist"
  aria-label="Business insurance categories"
  onKeyDown={onTabKeyDown}
>
  {tabs.map((tab) => {
    const isActive = activeTab === tab.id;

    return (
      <button
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
        tabIndex={isActive ? 0 : -1}
        className={`${tabBase} ${isActive ? tabActive : tabIdle}`}
      >
        <span className="text-center leading-tight">
          <span className="block">{tab.label}</span>
        </span>
      </button>
    );
  })}
</div>
            </section>

            {/* Content */}
            <section className={`${softCard}`}>
              <AnimatePresence mode="wait">
                <motion.section
                  key={activeTab}
                  id={`${activeTab}-panel`}
                  role="tabpanel"
                  aria-labelledby={`${activeTab}-tab`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={reduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } } : fadeInUp}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className="flex flex-col gap-4 md:gap-6">
                    {/* Inner components handle their own headings */}
                    {tabComponents[activeTab]}
                  </div>
                </motion.section>
              </AnimatePresence>
            </section>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Business;