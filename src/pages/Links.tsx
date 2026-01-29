import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FaUniversity,
  FaChartLine,
  FaInfoCircle,
  FaExternalLinkAlt,
  FaBuilding,
  FaGlobeAmericas,
  FaSearchDollar,
  FaBookOpen,
  FaGraduationCap,
  FaMoneyCheckAlt,
} from 'react-icons/fa';
import heroImage from '../images/links-hero.jpg';

type TabId = 'mutual' | 'industry' | 'financial' | 'personal';

const tabs: { id: TabId; label: string }[] = [
  { id: 'mutual', label: 'Mutual Fund Companies' },
  { id: 'industry', label: 'Industry Associations' },
  { id: 'financial', label: 'Financial Information' },
  { id: 'personal', label: 'Personal Finance' },
];

const tabData: Record<TabId, { name: string; url: string }[]> = {
  mutual: [
    { name: 'AGF', url: 'https://www.agf.com' },
    { name: 'Invesco', url: 'https://www.invesco.com/ca/en/home.html' },
    { name: 'CI Financial', url: 'https://www.cifinancial.com/' },
    { name: 'Dynamic Funds', url: 'https://www.dynamic.ca' },
    { name: 'Fidelity Canada', url: 'https://www.fidelity.ca/en/' },
    { name: 'Mackenzie Investments', url: 'https://www.mackenzieinvestments.com/en?userRole=investor' },
    { name: 'Franklin Templeton', url: 'https://www.templeton.com' },
  ],
  industry: [
    { name: 'Investment Funds Institute of Canada (IFIC)', url: 'https://www.ific.ca' },
    { name: 'Advocis', url: 'https://www.advocis.ca' },
    { name: 'Canadian Investment Regulatory Organization (CIRO)', url: 'https://www.ciro.ca' },
  ],
  financial: [
    { name: 'Fund Library', url: 'https://www.fundlibrary.com' },
    { name: 'Morningstar', url: 'https://www.morningstar.com' },
    { name: 'The Globe and Mail – GlobeFund', url: 'https://www.globefund.com' },
    { name: 'Quicken', url: 'https://www.quicken.com' },
    { name: 'CANNEX', url: 'https://www.cannex.com' },
    { name: 'Investor Learning Centre', url: 'https://www.investorlearning.ca' },
    { name: 'Canada Revenue Agency', url: 'https://www.canada.ca/en/revenue-agency.html' },
  ],
  personal: [{ name: 'Yahoo Finance', url: 'https://www.yahoo.com/finance' }],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const fadeInNoMotion = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// (kept, but no longer used for button icons — leaving here harmlessly in case you want it later)
const getLinkIcon = (tab: TabId, name: string): React.ReactNode => {
  const lower = name.toLowerCase();

  if (tab === 'mutual') {
    if (lower.includes('fidelity') || lower.includes('franklin')) return <FaUniversity className="text-sm" aria-hidden="true" />;
    if (lower.includes('dynamic') || lower.includes('mackenzie')) return <FaChartLine className="text-sm" aria-hidden="true" />;
    return <FaMoneyCheckAlt className="text-sm" aria-hidden="true" />;
  }

  if (tab === 'industry') return <FaBuilding className="text-sm" aria-hidden="true" />;

  if (tab === 'financial') {
    if (lower.includes('library') || lower.includes('learning')) return <FaBookOpen className="text-sm" aria-hidden="true" />;
    if (lower.includes('morningstar') || lower.includes('globefund')) return <FaSearchDollar className="text-sm" aria-hidden="true" />;
    if (lower.includes('revenue') || lower.includes('canada')) return <FaGlobeAmericas className="text-sm" aria-hidden="true" />;
    return <FaInfoCircle className="text-sm" aria-hidden="true" />;
  }

  if (lower.includes('yahoo')) return <FaGlobeAmericas className="text-sm" aria-hidden="true" />;
  return <FaGraduationCap className="text-sm" aria-hidden="true" />;
};

const Links: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('mutual');
  const [announcement, setAnnouncement] = useState('');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const currentLabel = tabs.find((t) => t.id === activeTab)?.label;
    if (currentLabel) setAnnouncement(`${currentLabel} tab selected`);
  }, [activeTab]);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, id: TabId) => {
    const currentIndex = tabs.findIndex((t) => t.id === id);
    if (currentIndex === -1) return;

    let newIndex = currentIndex;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      newIndex = (currentIndex + 1) % tabs.length;
      event.preventDefault();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      event.preventDefault();
    }

    if (newIndex !== currentIndex) setActiveTab(tabs[newIndex].id);
  };

  // 2026 surface system (matches Contact + Wealth)
  const pageBg = 'bg-[#f4f2ec]';

  const softPanel =
    'rounded-[22px] border border-black/10 bg-white/78 backdrop-blur-md ' +
    'shadow-[0_22px_70px_rgba(0,0,0,0.10)]';

  const sectionCard =
    'rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm ' +
    'shadow-[0_14px_42px_rgba(0,0,0,0.08)] ' +
    'p-5 sm:p-6 lg:p-7';

  const tabBase =
    'inline-flex items-center justify-center rounded-full border-2 px-4 py-2 ' +
    'text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.14em] ' +
    'transition-all duration-300 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f5028]/25';

  const tabActive =
    'bg-[#2f7a2e] text-white border-[#2f7a2e] shadow-sm hover:bg-[#3a8b34] hover:border-[#3a8b34]';

  const tabIdle =
    'bg-white/80 text-[#0f5028] border-[#2f7a2e]/35 hover:bg-white hover:border-[#2f7a2e]/55';

  // ✅ Link buttons: no per-link icon, keep ONLY outgoing icon
  // ✅ Allow wrapping to 2 lines when needed (no truncation)
  const linkCard =
    'relative group w-full ' +
    'rounded-xl border border-black/10 bg-white/70 backdrop-blur-sm ' +
    'px-4 py-4 shadow-sm ' +
    'flex items-center justify-between gap-3 ' +
    'transition-all duration-300 ' +
    'hover:bg-white hover:shadow-[0_14px_42px_rgba(0,0,0,0.10)] ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f5028]/25';

  const linkTitle =
    'text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-[#102019] tracking-[0.02em] ' +
    'leading-snug';

  const renderLinksGrid = (items: { name: string; url: string }[], cols: string) => (
    <div className={`grid ${cols} gap-4 sm:gap-5`}>
      {items.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
          whileFocus={shouldReduceMotion ? undefined : { scale: 1.005 }}
          className={linkCard}
          aria-label={`Visit ${link.name} website. Opens in a new tab.`}
        >
          {/* ✅ No truncation; wraps to 2 lines if needed */}
          <span className={`${linkTitle} pr-2`}>
            {link.name}
          </span>

          {/* ✅ Keep ONLY outgoing icon */}
          <span className="flex items-center flex-shrink-0 text-[#0f5028]">
            <FaExternalLinkAlt className="text-xs opacity-80 group-hover:opacity-100" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </span>
        </motion.a>
      ))}
    </div>
  );

  const variants = shouldReduceMotion ? fadeInNoMotion : fadeInUp;

  return (
    <div className={`min-h-screen ${pageBg} text-[#1f2937] font-inter`}>
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white/90 focus:px-4 focus:py-2 focus:rounded-xs focus:shadow-lg focus:z-50"
      >
        Skip to main content
      </a>

      {/* Live region for tab announcements (screen readers) */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <header>
        {/* HERO — remove the “glass pad” that caused the weird blur behind the H1 */}
        <section aria-label="Links page hero" className="relative">
          <div className="relative overflow-hidden">
            <img
              src={heroImage}
              alt="Explore trusted links to financial resources."
              loading="eager"
              decoding="async"
              className="
                w-full
                h-[clamp(250px,62vw,360px)]
                sm:h-[clamp(280px,36vw,420px)]
                lg:h-[clamp(280px,28vw,420px)]
                object-cover
                object-[56%_40%]
                saturate-[0.98]
                contrast-[1.02]
              "
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,242,236,0.96),rgba(244,242,236,0.84),rgba(15,80,40,0.08))]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(0,0,0,0.12),transparent_56%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.14),transparent)]"
            />

            <div className="absolute inset-0">
              <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                <div className="h-full flex items-center">
                  <div className="relative -translate-y-3 sm:-translate-y-6 lg:-translate-y-4">
                    <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#0f5028]">
                      Research • Education • Tools
                    </p>

                    <h1 className="mt-2.5 sm:mt-3 font-sans font-medium tracking-tight text-[#102019] leading-[1.05] text-[2.05rem] sm:text-5xl lg:text-6xl">
                      Trusted Financial
                      <br />
                      <span className="whitespace-nowrap">Resource Links</span>
                    </h1>

                    <p className="mt-3 text-[16px] text-[#1f2937]/80 leading-relaxed max-w-[56ch]">
                      A curated collection of reliable sites to help you compare options, learn fundamentals,
                      and stay informed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-10 sm:h-12 bg-[linear-gradient(to_bottom,rgba(244,242,236,0.0),rgba(244,242,236,1))]" />
        </section>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-14"
      >
        {/* Overlapping surface panel */}
        <div className={`-mt-9 sm:-mt-14 lg:-mt-20 p-4 sm:p-6 lg:p-8 ${softPanel}`}>
          <section aria-label="Financial resource categories and links">
            {/* Tabs — ✅ no icons */}
                        <header className="text-center mb-6 sm:mb-8">
  <h2 className="font-sans text-[1.55rem] sm:text-2xl font-semibold tracking-tight text-[#0f5028]">
    Explore resources by category
  </h2>
  <p className="mt-2 text-[15px] sm:text-[16px] text-[#1f2937]/70 leading-relaxed max-w-[68ch] mx-auto">
 Select a category to view details. Use Arrow keys to move between tabs.
  </p>
</header>
            <div
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
              role="tablist"
              aria-label="Financial resource categories"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${tab.id}-panel`}
                    id={`${tab.id}-tab`}
                    tabIndex={isActive ? 0 : -1}
                    className={`${tabBase} ${isActive ? tabActive : tabIdle}`}
                  >
                    <span className="text-center leading-tight">
                      {/* ✅ wrap to 2 lines if needed */}
                      <span className="block">{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'mutual' && (
                <motion.section
                  key="mutual"
                  id="mutual-panel"
                  role="tabpanel"
                  aria-labelledby="mutual-tab"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.35 }}
                  className={sectionCard}
                >
                  <div className="mb-5">
                    <h2 className="font-sans text-2xl font-semibold tracking-tight text-[#0f5028]">
                      Mutual Fund Companies
                    </h2>
                    <p className="mt-2 text-[15px] sm:text-[16px] text-[#1f2937]/75 leading-relaxed">
                      Explore products, performance, and investor education directly from leading fund providers.
                    </p>
                  </div>

                  {renderLinksGrid(tabData.mutual, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}
                </motion.section>
              )}

              {activeTab === 'industry' && (
                <motion.section
                  key="industry"
                  id="industry-panel"
                  role="tabpanel"
                  aria-labelledby="industry-tab"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.35 }}
                  className={sectionCard}
                >
                  <div className="mb-5">
                    <h2 className="font-sans text-2xl font-semibold tracking-tight text-[#0f5028]">
                      Industry Associations
                    </h2>
                    <p className="mt-2 text-[15px] sm:text-[16px] text-[#1f2937]/75 leading-relaxed">
                      Professional associations and regulatory bodies that support advisors and uphold standards in Canadian
                      financial services.
                    </p>
                  </div>

                  {renderLinksGrid(tabData.industry, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}
                </motion.section>
              )}

              {activeTab === 'financial' && (
                <motion.section
                  key="financial"
                  id="financial-panel"
                  role="tabpanel"
                  aria-labelledby="financial-tab"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.35 }}
                  className={sectionCard}
                >
                  <div className="mb-5">
                    <h2 className="font-sans text-2xl font-semibold tracking-tight text-[#0f5028]">
                      Financial Information
                    </h2>
                    <p className="mt-2 text-[15px] sm:text-[16px] text-[#1f2937]/75 leading-relaxed">
                      Independent research tools, data libraries, and education hubs to support informed decisions.
                    </p>
                  </div>

                  {renderLinksGrid(tabData.financial, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}
                </motion.section>
              )}

              {activeTab === 'personal' && (
                <motion.section
                  key="personal"
                  id="personal-panel"
                  role="tabpanel"
                  aria-labelledby="personal-tab"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.35 }}
                  className={sectionCard}
                >
                  <div className="mb-5">
                    <h2 className="font-sans text-2xl font-semibold tracking-tight text-[#0f5028]">
                      Personal Finance
                    </h2>
                    <p className="mt-2 text-[15px] sm:text-[16px] text-[#1f2937]/75 leading-relaxed">
                      Consumer-friendly tools for market news, quotes, and everyday money education.
                    </p>
                  </div>

                  {renderLinksGrid(tabData.personal, 'grid-cols-1 sm:grid-cols-2')}
                </motion.section>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Links;