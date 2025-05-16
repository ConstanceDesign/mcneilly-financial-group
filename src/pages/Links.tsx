import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUniversity,
  FaChartLine,
  FaInfoCircle,
  FaWallet,
} from 'react-icons/fa';
import heroImage from '../images/wealth-hero.jpg';

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

const Links: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mutual' | 'industry' | 'financial'>('mutual');

  return (
    <div className="text-[#333] font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-[#1f7a45] text-white">
        <img
          src={heroImage}
          alt="Investing for the future"
          className="h-full w-full object-cover opacity-20 absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-96 px-4">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
            Valuable Links
          </h1>
          <p className="mt-4 text-lg md:text-xl text-softGray drop-shadow-md">
          Explore financial resources covering mutual funds, industry groups, planning tools, and more.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-12 pb-20">
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'mutual' | 'industry' | 'financial')}
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
          <motion.div
            key={activeTab}
            variants={fadeInScale}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {tabData[activeTab].map(link => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group ${sectionColors[activeTab]}text-[#bcda8e] bg-[#c2e1a1] font-bold tracking-wide rounded-xs p-5 shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#62a342] hover:text-white hover:shadow-xl`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 bg-[#7d9e8a] opacity-0 group-hover:opacity-0 transition duration-300 rounded-sm"></span>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Links;