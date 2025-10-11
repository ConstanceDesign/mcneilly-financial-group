import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUniversity,
  FaChartLine,
  FaInfoCircle,
  FaWallet,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import heroImage from '../images/links-hero.jpg';

const tabs = [
  { id: 'mutual', label: 'Mutual Funds', icon: <FaUniversity /> },
  { id: 'industry', label: 'Industry Groups', icon: <FaChartLine /> },
  { id: 'financial', label: 'Financial Info', icon: <FaInfoCircle /> },
  { id: 'personal', label: 'Personal Finance', icon: <FaWallet /> },
];

const tabData = {
  mutual: [
    { name: "AGF", url: "https://www.agf.com" },
    { name: "Invesco", url: "https://www.invesco.com/ca/en/home.html" },
    { name: "CIFunds", url: "https://www.cifunds.com" },
    { name: "Dynamic Mutual Funds", url: "https://www.dynamic.ca" },
    { name: "Fidelity", url: "https://www.fidelity.ca/en/" },
    { name: "Mackenzie", url: "https://www.mackenzieinvestments.com/en?userRole=investor" },
    { name: "Franklin Templeton", url: "https://www.templeton.com" },
  ],
  industry: [
    { name: "IFIC", url: "https://www.ific.ca" },
    { name: "Advocis", url: "https://www.advocis.ca" },
    { name: "MFDA", url: "https://www.mfda.ca" },
  ],
  financial: [
    { name: "Fund Library", url: "https://www.fundlibrary.com" },
    { name: "Morningstar", url: "https://www.morningstar.com" },
    { name: "Globefund", url: "https://www.globefund.com" },
    { name: "Quicken", url: "https://www.quicken.com" },
    { name: "CANNEX", url: "https://www.cannex.com" },
    { name: "Investor Learning Centre", url: "https://www.investorlearning.ca" },
    { name: "CRA", url: "https://www.cra-arc.gc.ca" },
  ],
  personal: [
    { name: "Yahoo Finance", url: "https://www.yahoo.com/finance" },
  ]
};

const sectionColors = {
  mutual: 'bg-[#7d9e8a]',
  industry: 'bg-[#7d9e8a]',
  financial: 'bg-[#7d9e8a]',
  personal: 'bg-[#7d9e8a]',
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Links: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mutual' | 'industry' | 'financial' | 'personal'>('mutual');

  return (
    <div className="text-[#333] font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-[#1f7a45] text-white">
        <img
          src={heroImage}
          alt="Explore trusted links to financial resources."
          loading="lazy"
          className="h-full w-full object-cover opacity-25 absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-96 px-4">
        <h1 className="text-[2.4rem] font-serif leading-tight md:text-6xl md:leading-[1.1] font-bold drop-shadow-sm text-white px-4 py-2">Explore Trusted Links to Financial Resources </h1>
        </div>
      </section>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-12 pb-25">
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
          {activeTab === 'mutual' && (
            <motion.section
              key="mutual"
              aria-labelledby="mutual-funds"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <FaUniversity className="text-2xl" />
                <h2 id="mutual-funds" className="text-2xl font-semibold">Mutual Funds</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tabData.mutual.map(link => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative group ${sectionColors[activeTab]}text-[#bcda8e] bg-[#c2e1a1] text-lg font-bold tracking-wide rounded-xs p-5 shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#62a342] hover:text-white hover:shadow-xl flex justify-between items-center`}
                  >
                    <span>{link.name}</span>
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </motion.a>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 'industry' && (
            <motion.section
              key="industry"
              aria-labelledby="industry-groups"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-2xl" />
                <h2 id="industry-groups" className="text-2xl font-semibold">Industry Groups</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {tabData.industry.map(link => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative group ${sectionColors[activeTab]}text-[#bcda8e] bg-[#c2e1a1] text-lg font-bold tracking-wide rounded-xs p-5 shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#62a342] hover:text-white hover:shadow-xl flex justify-between items-center`}
                  >
                    <span>{link.name}</span>
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </motion.a>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 'financial' && (
            <motion.section
              key="financial"
              aria-labelledby="financial-info"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FaInfoCircle className="text-2xl" />
                <h2 id="financial-info" className="text-2xl font-semibold">Financial Info</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tabData.financial.map(link => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative group ${sectionColors[activeTab]}text-[#bcda8e] bg-[#c2e1a1] text-lg font-bold tracking-wide rounded-xs p-5 shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#62a342] hover:text-white hover:shadow-xl flex justify-between items-center`}
                  >
                    <span>{link.name}</span>
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </motion.a>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 'personal' && (
            <motion.section
              key="personal"
              aria-labelledby="personal-finance"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FaWallet className="text-2xl" />
                <h2 id="personal-finance" className="text-2xl font-semibold">Personal Finance</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6">
                {tabData.personal.map(link => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative group ${sectionColors[activeTab]}text-[#bcda8e] bg-[#c2e1a1] text-lg font-bold tracking-wide rounded-xs p-5 shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#62a342] hover:text-white hover:shadow-xl flex justify-between items-center`}
                  >
                    <span>{link.name}</span>
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </motion.a>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Links;