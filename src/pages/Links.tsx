// // import React, { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import {
// //   FaUniversity,
// //   FaChartLine,
// //   FaInfoCircle,
// //   FaWallet,
// //   FaExternalLinkAlt,
// // } from 'react-icons/fa';
// // import heroImage from '../images/links-hero.jpg';

// // const tabs = [
// //   { id: 'mutual', label: 'Mutual Funds', icon: <FaUniversity /> },
// //   { id: 'industry', label: 'Industry Groups', icon: <FaChartLine /> },
// //   { id: 'financial', label: 'Financial Info', icon: <FaInfoCircle /> },
// //   { id: 'personal', label: 'Personal Finance', icon: <FaWallet /> },
// // ];

// // const tabData = {
// //   mutual: [
// //     { name: "AGF", url: "https://www.agf.com" },
// //     { name: "Invesco", url: "https://www.invesco.com/ca/en/home.html" },
// //     { name: "CIFunds", url: "https://www.cifunds.com" },
// //     { name: "Dynamic Mutual Funds", url: "https://www.dynamic.ca" },
// //     { name: "Fidelity", url: "https://www.fidelity.ca/en/" },
// //     { name: "Mackenzie", url: "https://www.mackenzieinvestments.com/en?userRole=investor" },
// //     { name: "Franklin Templeton", url: "https://www.templeton.com" },
// //   ],
// //   industry: [
// //     { name: "IFIC", url: "https://www.ific.ca" },
// //     { name: "Advocis", url: "https://www.advocis.ca" },
// //     { name: "MFDA", url: "https://www.mfda.ca" },
// //   ],
// //   financial: [
// //     { name: "Fund Library", url: "https://www.fundlibrary.com" },
// //     { name: "Morningstar", url: "https://www.morningstar.com" },
// //     { name: "Globefund", url: "https://www.globefund.com" },
// //     { name: "Quicken", url: "https://www.quicken.com" },
// //     { name: "CANNEX", url: "https://www.cannex.com" },
// //     { name: "Investor Learning Centre", url: "https://www.investorlearning.ca" },
// //     { name: "CRA", url: "https://www.cra-arc.gc.ca" },
// //   ],
// //   personal: [
// //     { name: "Yahoo Finance", url: "https://www.yahoo.com/finance" },
// //   ]
// // };

// // const sectionColors = {
// //   mutual: 'bg-[#7d9e8a]',
// //   industry: 'bg-[#7d9e8a]',
// //   financial: 'bg-[#7d9e8a]',
// //   personal: 'bg-[#7d9e8a]',
// // };

// // const fadeInScale = {
// //   hidden: { opacity: 0, scale: 0.95 },
// //   visible: { opacity: 1, scale: 1 },
// //   exit: { opacity: 0, scale: 0.95 }
// // };

// // const fadeInUp = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: { opacity: 1, y: 0 },
// // };

// // const Links: React.FC = () => {
// //   const [activeTab, setActiveTab] = useState<'mutual' | 'industry' | 'financial' | 'personal'>('mutual');

// //   return (
// //     <div className="text-[#333] font-sans">
// //       {/* Hero Section */}
// //       <section className="relative bg-gradient-to-br from-primary to-[#1f7a45] text-white">
// //         <img
// //           src={heroImage}
// //           alt="Explore trusted links to financial resources."
// //           loading="lazy"
// //           className="h-full w-full object-cover opacity-25 absolute inset-0 z-0"
// //         />
// //         <div className="relative z-10 flex flex-col items-center justify-center text-center h-96 px-4">
// //         <h1 className="text-[2.4rem] font-serif leading-tight md:text-6xl md:leading-[1.1] font-bold drop-shadow-sm text-white px-4 py-2">Explore Trusted Links to Financial Resources </h1>
// //         </div>
// //       </section>

// //       {/* Tabs */}
// //       <div className="container mx-auto px-6 py-12 pb-25">
// //         <div className="flex justify-center gap-6 mb-12 flex-wrap">
// //           {tabs.map(tab => (
// //             <button
// //               key={tab.id}
// //               onClick={() => setActiveTab(tab.id as typeof activeTab)}
// //               className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 md:text-base font-semibold uppercase tracking-widest transition-all duration-300 ${
// //                 activeTab === tab.id
// //                   ? 'bg-accent text-[#0a4020] border-accent'
// //                   : 'border-[#8cbe3f] text-[#127038] hover:bg-mutedGreen hover:text-[#8cbe3f] hover:border-mutedGreen'
// //               }`}
// //             >
// //               {tab.icon} {tab.label}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Tab Content */}
// //         <AnimatePresence mode="wait">
// //           {activeTab === 'mutual' && (
// //             <motion.section
// //               key="mutual"
// //               aria-labelledby="mutual-funds"
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               variants={fadeInUp}
// //               transition={{ duration: 0.4 }}
// //             >
// //               <div className="flex items-center gap-2 mb-6">
// //                 <FaUniversity className="text-2xl" />
// //                 <h2 id="mutual-funds" className="text-2xl font-semibold">Mutual Funds</h2>
// //               </div>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //                 {tabData.mutual.map(link => (
// //                   <motion.a
// //                     key={link.name}
// //                     href={link.url}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className={`relative group ${sectionColors[activeTab]}text-[#bcda8e] bg-[#c2e1a1] text-lg font-bold tracking-wide rounded-xs p-5 shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#62a342] hover:text-white hover:shadow-xl flex justify-between items-center`}
// //                   >
// //                     <span>{link.name}</span>
// //                     <FaExternalLinkAlt className="ml-2 text-sm" />
// //                   </motion.a>
// //                 ))}
// //               </div>
// //             </motion.section>
// //           )}

// //           {activeTab === 'industry' && (
// //             <motion.section
// //               key="industry"
// //               aria-labelledby="industry-groups"
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               variants={fadeInUp}
// //               transition={{ duration: 0.4 }}
// //             >
// //               <div className="flex items-center gap-2 mb-4">
// //                 <FaChartLine className="text-2xl" />
// //                 <h2 id="industry-groups" className="text-2xl font-semibold">Industry Groups</h2>
// //               </div>
// //               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
// //                 {tabData.industry.map(link => (
// //                   <motion.a
// //                     key={link.name}
// //                     href={link.url}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className={`relative group ${sectionColors[activeTab]}text-[#bcda8e] bg-[#c2e1a1] text-lg font-bold tracking-wide rounded-xs p-5 shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#62a342] hover:text-white hover:shadow-xl flex justify-between items-center`}
// //                   >
// //                     <span>{link.name}</span>
// //                     <FaExternalLinkAlt className="ml-2 text-sm" />
// //                   </motion.a>
// //                 ))}
// //               </div>
// //             </motion.section>
// //           )}

// //           {activeTab === 'financial' && (
// //             <motion.section
// //               key="financial"
// //               aria-labelledby="financial-info"
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               variants={fadeInUp}
// //               transition={{ duration: 0.4 }}
// //             >
// //               <div className="flex items-center gap-2 mb-4">
// //                 <FaInfoCircle className="text-2xl" />
// //                 <h2 id="financial-info" className="text-2xl font-semibold">Financial Info</h2>
// //               </div>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //                 {tabData.financial.map(link => (
// //                   <motion.a
// //                     key={link.name}
// //                     href={link.url}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className={`relative group ${sectionColors[activeTab]}text-[#bcda8e] bg-[#c2e1a1] text-lg font-bold tracking-wide rounded-xs p-5 shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#62a342] hover:text-white hover:shadow-xl flex justify-between items-center`}
// //                   >
// //                     <span>{link.name}</span>
// //                     <FaExternalLinkAlt className="ml-2 text-sm" />
// //                   </motion.a>
// //                 ))}
// //               </div>
// //             </motion.section>
// //           )}

// //           {activeTab === 'personal' && (
// //             <motion.section
// //               key="personal"
// //               aria-labelledby="personal-finance"
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               variants={fadeInUp}
// //               transition={{ duration: 0.4 }}
// //             >
// //               <div className="flex items-center gap-2 mb-4">
// //                 <FaWallet className="text-2xl" />
// //                 <h2 id="personal-finance" className="text-2xl font-semibold">Personal Finance</h2>
// //               </div>
// //               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6">
// //                 {tabData.personal.map(link => (
// //                   <motion.a
// //                     key={link.name}
// //                     href={link.url}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className={`relative group ${sectionColors[activeTab]}text-[#bcda8e] bg-[#c2e1a1] text-lg font-bold tracking-wide rounded-xs p-5 shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#62a342] hover:text-white hover:shadow-xl flex justify-between items-center`}
// //                   >
// //                     <span>{link.name}</span>
// //                     <FaExternalLinkAlt className="ml-2 text-sm" />
// //                   </motion.a>
// //                 ))}
// //               </div>
// //             </motion.section>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Links;


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
// import {
//   FaUniversity,
//   FaChartLine,
//   FaInfoCircle,
//   FaWallet,
//   FaExternalLinkAlt,
//   FaBuilding,
//   FaGlobeAmericas,
//   FaSearchDollar,
//   FaBookOpen,
//   FaGraduationCap,
//   FaMoneyCheckAlt,
// } from 'react-icons/fa';
// import heroImage from '../images/links-hero.jpg';

// type TabId = 'mutual' | 'industry' | 'financial' | 'personal';

// const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
//   { id: 'mutual', label: 'Mutual Funds', icon: <FaUniversity /> },
//   { id: 'industry', label: 'Industry Groups', icon: <FaChartLine /> },
//   { id: 'financial', label: 'Financial Info', icon: <FaInfoCircle /> },
//   { id: 'personal', label: 'Personal Finance', icon: <FaWallet /> },
// ];

// const tabData: Record<TabId, { name: string; url: string }[]> = {
//   mutual: [
//     { name: 'AGF', url: 'https://www.agf.com' },
//     { name: 'Invesco', url: 'https://www.invesco.com/ca/en/home.html' },
//     { name: 'CIFunds', url: 'https://www.cifunds.com' },
//     { name: 'Dynamic Mutual Funds', url: 'https://www.dynamic.ca' },
//     { name: 'Fidelity', url: 'https://www.fidelity.ca/en/' },
//     {
//       name: 'Mackenzie',
//       url: 'https://www.mackenzieinvestments.com/en?userRole=investor',
//     },
//     { name: 'Franklin Templeton', url: 'https://www.templeton.com' },
//   ],
//   industry: [
//     { name: 'IFIC', url: 'https://www.ific.ca' },
//     { name: 'Advocis', url: 'https://www.advocis.ca' },
//     { name: 'MFDA', url: 'https://www.mfda.ca' },
//   ],
//   financial: [
//     { name: 'Fund Library', url: 'https://www.fundlibrary.com' },
//     { name: 'Morningstar', url: 'https://www.morningstar.com' },
//     { name: 'Globefund', url: 'https://www.globefund.com' },
//     { name: 'Quicken', url: 'https://www.quicken.com' },
//     { name: 'CANNEX', url: 'https://www.cannex.com' },
//     {
//       name: 'Investor Learning Centre',
//       url: 'https://www.investorlearning.ca',
//     },
//     { name: 'CRA', url: 'https://www.cra-arc.gc.ca' },
//   ],
//   personal: [{ name: 'Yahoo Finance', url: 'https://www.yahoo.com/finance' }],
// };

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: 20 },
// };

// const fadeInNoMotion = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
//   exit: { opacity: 0 },
// };

// // Choose a small icon per link, for subtle visual hints
// const getLinkIcon = (tab: TabId, name: string): React.ReactNode => {
//   const lower = name.toLowerCase();

//   if (tab === 'mutual') {
//     if (lower.includes('fidelity') || lower.includes('franklin')) {
//       return <FaUniversity className="text-sm" aria-hidden="true" />;
//     }
//     if (lower.includes('dynamic') || lower.includes('mackenzie')) {
//       return <FaChartLine className="text-sm" aria-hidden="true" />;
//     }
//     return <FaMoneyCheckAlt className="text-sm" aria-hidden="true" />;
//   }

//   if (tab === 'industry') {
//     return <FaBuilding className="text-sm" aria-hidden="true" />;
//   }

//   if (tab === 'financial') {
//     if (lower.includes('library') || lower.includes('learning')) {
//       return <FaBookOpen className="text-sm" aria-hidden="true" />;
//     }
//     if (lower.includes('morningstar') || lower.includes('globefund')) {
//       return <FaSearchDollar className="text-sm" aria-hidden="true" />;
//     }
//     if (lower.includes('cra')) {
//       return <FaGlobeAmericas className="text-sm" aria-hidden="true" />;
//     }
//     return <FaInfoCircle className="text-sm" aria-hidden="true" />;
//   }

//   // personal
//   if (lower.includes('yahoo')) {
//     return <FaGlobeAmericas className="text-sm" aria-hidden="true" />;
//   }
//   return <FaGraduationCap className="text-sm" aria-hidden="true" />;
// };

// const Links: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabId>('mutual');
//   const [announcement, setAnnouncement] = useState('');
//   const shouldReduceMotion = useReducedMotion();

//   useEffect(() => {
//     const currentLabel = tabs.find((t) => t.id === activeTab)?.label;
//     if (currentLabel) {
//       setAnnouncement(`${currentLabel} tab selected`);
//     }
//   }, [activeTab]);

//   const handleTabKeyDown = (
//     event: React.KeyboardEvent<HTMLButtonElement>,
//     id: TabId
//   ) => {
//     const currentIndex = tabs.findIndex((t) => t.id === id);
//     if (currentIndex === -1) return;

//     let newIndex = currentIndex;

//     if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
//       newIndex = (currentIndex + 1) % tabs.length;
//       event.preventDefault();
//     } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
//       newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
//       event.preventDefault();
//     }

//     if (newIndex !== currentIndex) {
//       setActiveTab(tabs[newIndex].id);
//     }
//   };

//   const renderLinksGrid = (
//     tab: TabId,
//     items: { name: string; url: string }[],
//     cols: string
//   ) => (
//     <div className={`grid ${cols} gap-6`}>
//       {items.map((link) => (
//         <motion.a
//           key={link.name}
//           href={link.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
//           whileFocus={shouldReduceMotion ? undefined : { scale: 1.01 }}
//           className="
//             relative group
//             bg-[#c2e1a1] border border-[#8cbe3f]
//             text-[#0f5028] text-sm md:text-base font-semibold uppercase tracking-widest
//             rounded-xs px-4 py-4 shadow-sm
//             flex items-center justify-between gap-3
//             transition-all duration-300
//             hover:bg-[#4b9328] hover:text-white hover:border-[#4b9328] hover:shadow-xl
//             focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f]
//           "
//           aria-label={`Visit ${link.name} website, opens in new tab`}
//         >
//           <div className="flex items-center gap-3 min-w-0">
//             <span className="flex-shrink-0 text-[#0f5028] group-hover:text-white transition-colors duration-300">
//               {getLinkIcon(tab, link.name)}
//             </span>
//             <span className="truncate">{link.name}</span>
//           </div>
//           <span className="flex items-center gap-1 flex-shrink-0">
//             <FaExternalLinkAlt
//               className="text-xs opacity-80 group-hover:opacity-100"
//               aria-hidden="true"
//             />
//             <span className="sr-only">(opens in a new tab)</span>
//           </span>
//         </motion.a>
//       ))}
//     </div>
//   );

//   const variants = shouldReduceMotion ? fadeInNoMotion : fadeInUp;

//   return (
//     <div className="min-h-screen bg-[#e5e5e5] text-[#333] font-sans">
//       {/* Skip link for keyboard users */}
//       <a
//         href="#main-content"
//         className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:z-50"
//       >
//         Skip to main content
//       </a>

//       {/* Live region for tab announcements (screen readers) */}
//       <div aria-live="polite" className="sr-only">
//         {announcement}
//       </div>

//       <header>
//         {/* Hero Section */}
//         <section className="relative bg-gradient-to-r from-[#0f5028] to-[#4b9328] text-white">
//           <img
//             src={heroImage}
//             alt="Explore trusted links to financial resources."
//             loading="lazy"
//             className="h-full w-full object-cover opacity-25 absolute inset-0 z-0"
//           />
//           <div className="relative z-10 flex flex-col items-center justify-center text-center h-80 md:h-96 px-4">
//             <h1 className="text-[2.2rem] md:text-5xl lg:text-6xl font-serif font-bold leading-tight md:leading-[1.1] drop-shadow-sm px-4 py-2">
//               Explore Trusted Links to Financial Resources
//             </h1>
//             <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#e8f7e1]">
//               A curated collection of reliable financial sites to help you research, learn, and stay
//               informed.
//             </p>
//           </div>
//         </section>
//       </header>

//       <main
//         id="main-content"
//         tabIndex={-1}
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14"
//       >
//         <section
//           aria-label="Financial resource categories and links"
//           className="bg-white border border-[#d0d0d0] rounded-xl shadow-md p-6 md:p-10"
//         >
//           {/* Tabs */}
//           <div
//             className="flex justify-center gap-4 md:gap-6 mb-10 flex-wrap"
//             role="tablist"
//             aria-label="Financial resource categories"
//           >
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setActiveTab(tab.id)}
//                 onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
//                 role="tab"
//                 aria-selected={activeTab === tab.id}
//                 aria-controls={`${tab.id}-panel`}
//                 id={`${tab.id}-tab`}
//                 tabIndex={activeTab === tab.id ? 0 : -1}
//                 className={`
//                   flex items-center gap-2 px-4 py-2 rounded-full border-2
//                   md:text-sm lg:text-base font-semibold uppercase tracking-widest
//                   transition-all duration-300
//                   ${
//                     activeTab === tab.id
//                       ? 'bg-accent text-[#0a4020] border-accent'
//                       : 'border-[#8cbe3f] text-[#127038] hover:bg-mutedGreen hover:text-[#8cbe3f] hover:border-mutedGreen'
//                   }
//                   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f]
//                 `}
//               >
//                 {tab.icon}
//                 <span>{tab.label}</span>
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           <AnimatePresence mode="wait">
//             {activeTab === 'mutual' && (
//               <motion.section
//                 key="mutual"
//                 id="mutual-panel"
//                 role="tabpanel"
//                 aria-labelledby="mutual-tab"
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 variants={variants}
//                 transition={{ duration: 0.4 }}
//               >
//                 <div className="mb-6">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FaUniversity className="text-2xl text-[#0f5028]" aria-hidden="true" />
//                     <h2 className="text-2xl font-serif font-semibold text-[#0f5028]">
//                       Mutual Funds
//                     </h2>
//                   </div>
//                   <p className="text-sm md:text-base text-slate-700">
//                     Direct links to leading mutual fund companies where you can explore products,
//                     performance, and educational materials.
//                   </p>
//                 </div>
//                 {renderLinksGrid(
//                   'mutual',
//                   tabData.mutual,
//                   'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
//                 )}
//               </motion.section>
//             )}

//             {activeTab === 'industry' && (
//               <motion.section
//                 key="industry"
//                 id="industry-panel"
//                 role="tabpanel"
//                 aria-labelledby="industry-tab"
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 variants={variants}
//                 transition={{ duration: 0.4 }}
//               >
//                 <div className="mb-6">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FaChartLine className="text-2xl text-[#0f5028]" aria-hidden="true" />
//                     <h2 className="text-2xl font-serif font-semibold text-[#0f5028]">
//                       Industry Groups
//                     </h2>
//                   </div>
//                   <p className="text-sm md:text-base text-slate-700">
//                     Professional associations and regulatory organizations that support advisors and
//                     uphold standards in Canada&apos;s financial services industry.
//                   </p>
//                 </div>
//                 {renderLinksGrid(
//                   'industry',
//                   tabData.industry,
//                   'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
//                 )}
//               </motion.section>
//             )}

//             {activeTab === 'financial' && (
//               <motion.section
//                 key="financial"
//                 id="financial-panel"
//                 role="tabpanel"
//                 aria-labelledby="financial-tab"
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 variants={variants}
//                 transition={{ duration: 0.4 }}
//               >
//                 <div className="mb-6">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FaInfoCircle className="text-2xl text-[#0f5028]" aria-hidden="true" />
//                     <h2 className="text-2xl font-serif font-semibold text-[#0f5028]">
//                       Financial Info
//                     </h2>
//                   </div>
//                   <p className="text-sm md:text-base text-slate-700">
//                     Independent research tools, data libraries, and educational hubs to help you
//                     compare investments and deepen your market knowledge.
//                   </p>
//                 </div>
//                 {renderLinksGrid(
//                   'financial',
//                   tabData.financial,
//                   'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
//                 )}
//               </motion.section>
//             )}

//             {activeTab === 'personal' && (
//               <motion.section
//                 key="personal"
//                 id="personal-panel"
//                 role="tabpanel"
//                 aria-labelledby="personal-tab"
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 variants={variants}
//                 transition={{ duration: 0.4 }}
//               >
//                 <div className="mb-6">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FaWallet className="text-2xl text-[#0f5028]" aria-hidden="true" />
//                     <h2 className="text-2xl font-serif font-semibold text-[#0f5028]">
//                       Personal Finance
//                     </h2>
//                   </div>
//                   <p className="text-sm md:text-base text-slate-700">
//                     Consumer-focused tools that help you monitor markets, follow financial news, and
//                     stay engaged with your own money decisions.
//                   </p>
//                 </div>
//                 {renderLinksGrid(
//                   'personal',
//                   tabData.personal,
//                   'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
//                 )}
//               </motion.section>
//             )}
//           </AnimatePresence>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Links;



import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FaUniversity,
  FaChartLine,
  FaInfoCircle,
  FaWallet,
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

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'mutual', label: 'Mutual Funds', icon: <FaUniversity /> },
  { id: 'industry', label: 'Industry Groups', icon: <FaChartLine /> },
  { id: 'financial', label: 'Financial Info', icon: <FaInfoCircle /> },
  { id: 'personal', label: 'Personal Finance', icon: <FaWallet /> },
];

const tabData: Record<TabId, { name: string; url: string }[]> = {
  mutual: [
    { name: 'AGF', url: 'https://www.agf.com' },
    { name: 'Invesco', url: 'https://www.invesco.com/ca/en/home.html' },
    { name: 'CIFunds', url: 'https://www.cifunds.com' },
    { name: 'Dynamic Mutual Funds', url: 'https://www.dynamic.ca' },
    { name: 'Fidelity', url: 'https://www.fidelity.ca/en/' },
    {
      name: 'Mackenzie',
      url: 'https://www.mackenzieinvestments.com/en?userRole=investor',
    },
    { name: 'Franklin Templeton', url: 'https://www.templeton.com' },
  ],
  industry: [
    { name: 'IFIC', url: 'https://www.ific.ca' },
    { name: 'Advocis', url: 'https://www.advocis.ca' },
    { name: 'MFDA', url: 'https://www.mfda.ca' },
  ],
  financial: [
    { name: 'Fund Library', url: 'https://www.fundlibrary.com' },
    { name: 'Morningstar', url: 'https://www.morningstar.com' },
    { name: 'Globefund', url: 'https://www.globefund.com' },
    { name: 'Quicken', url: 'https://www.quicken.com' },
    { name: 'CANNEX', url: 'https://www.cannex.com' },
    {
      name: 'Investor Learning Centre',
      url: 'https://www.investorlearning.ca',
    },
    { name: 'CRA', url: 'https://www.cra-arc.gc.ca' },
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

// Choose a small icon per link, for subtle visual hints
const getLinkIcon = (tab: TabId, name: string): React.ReactNode => {
  const lower = name.toLowerCase();

  if (tab === 'mutual') {
    if (lower.includes('fidelity') || lower.includes('franklin')) {
      return <FaUniversity className="text-sm" aria-hidden="true" />;
    }
    if (lower.includes('dynamic') || lower.includes('mackenzie')) {
      return <FaChartLine className="text-sm" aria-hidden="true" />;
    }
    return <FaMoneyCheckAlt className="text-sm" aria-hidden="true" />;
  }

  if (tab === 'industry') {
    return <FaBuilding className="text-sm" aria-hidden="true" />;
  }

  if (tab === 'financial') {
    if (lower.includes('library') || lower.includes('learning')) {
      return <FaBookOpen className="text-sm" aria-hidden="true" />;
    }
    if (lower.includes('morningstar') || lower.includes('globefund')) {
      return <FaSearchDollar className="text-sm" aria-hidden="true" />;
    }
    if (lower.includes('cra')) {
      return <FaGlobeAmericas className="text-sm" aria-hidden="true" />;
    }
    return <FaInfoCircle className="text-sm" aria-hidden="true" />;
  }

  // personal
  if (lower.includes('yahoo')) {
    return <FaGlobeAmericas className="text-sm" aria-hidden="true" />;
  }
  return <FaGraduationCap className="text-sm" aria-hidden="true" />;
};

const Links: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('mutual');
  const [announcement, setAnnouncement] = useState('');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const currentLabel = tabs.find((t) => t.id === activeTab)?.label;
    if (currentLabel) {
      setAnnouncement(`${currentLabel} tab selected`);
    }
  }, [activeTab]);

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    id: TabId
  ) => {
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

    if (newIndex !== currentIndex) {
      setActiveTab(tabs[newIndex].id);
    }
  };

  const renderLinksGrid = (
    tab: TabId,
    items: { name: string; url: string }[],
    cols: string
  ) => (
    <div className={`grid ${cols} gap-6`}>
      {items.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
          whileFocus={shouldReduceMotion ? undefined : { scale: 1.01 }}
          className="
            relative group
            bg-[#c2e1a1] border border-[#8cbe3f]
            text-[#0f5028] text-sm md:text-base font-semibold uppercase tracking-widest
            rounded-xs px-4 py-4 shadow-sm
            flex items-center justify-between gap-3
            transition-all duration-300
            hover:bg-[#4b9328] hover:text-white hover:border-[#4b9328] hover:shadow-xl
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f]
          "
          aria-label={`Visit ${link.name} website, opens in new tab`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex-shrink-0 text-[#0f5028] group-hover:text-white transition-colors duration-300">
              {getLinkIcon(tab, link.name)}
            </span>
            <span className="truncate">{link.name}</span>
          </div>
          <span className="flex items-center gap-1 flex-shrink-0">
            <FaExternalLinkAlt
              className="text-xs opacity-80 group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </span>
        </motion.a>
      ))}
    </div>
  );

  const variants = shouldReduceMotion ? fadeInNoMotion : fadeInUp;

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-[#333] font-sans">
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:z-50"
      >
        Skip to main content
      </a>

      {/* Live region for tab announcements (screen readers) */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <header>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#0f5028] to-[#4b9328] text-white">
          <img
            src={heroImage}
            alt="Explore trusted links to financial resources."
            loading="lazy"
            className="h-full w-full object-cover opacity-25 absolute inset-0 z-0"
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-80 md:h-96 px-4">
            <h1 className="text-[2.2rem] md:text-5xl lg:text-6xl font-serif font-bold leading-tight md:leading-[1.1] drop-shadow-sm px-4 py-2">
              Explore Trusted Links to Financial Resources
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#e8f7e1]">
              A curated collection of reliable financial sites to help you research, learn, and stay
              informed.
            </p>
          </div>
        </section>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14"
      >
        <section
          aria-label="Financial resource categories and links"
          className="bg-white border border-[#d0d0d0] rounded-xl shadow-md p-6 md:p-10"
        >
          {/* Tabs – now visually aligned with Personal.tsx */}
          <div
            className="flex justify-center gap-4 md:gap-6 mb-10 flex-wrap"
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
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full border-2
                    text-xs md:text-sm font-bold uppercase tracking-widest
                    transition-all duration-300
                    ${
                      isActive
                        ? 'bg-[#4b9328] text-white border-[#4b9328] shadow-md hover:bg-[#8cbe3f] hover:border-[#8cbe3f] hover:scale-105'
                        : 'bg-white text-[#0f5028] border-[#8cbe3f] hover:bg-[#8cbe3f] hover:text-white hover:border-[#8cbe3f] hover:scale-105'
                    }
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f]
                  `}
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
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaUniversity className="text-2xl text-[#0f5028]" aria-hidden="true" />
                    <h2 className="text-2xl font-serif font-semibold text-[#0f5028]">
                      Mutual Funds
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-slate-700">
                    Direct links to leading mutual fund companies where you can explore products,
                    performance, and educational materials.
                  </p>
                </div>
                {renderLinksGrid(
                  'mutual',
                  tabData.mutual,
                  'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                )}
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
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaChartLine className="text-2xl text-[#0f5028]" aria-hidden="true" />
                    <h2 className="text-2xl font-serif font-semibold text-[#0f5028]">
                      Industry Groups
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-slate-700">
                    Professional associations and regulatory organizations that support advisors and
                    uphold standards in Canada&apos;s financial services industry.
                  </p>
                </div>
                {renderLinksGrid(
                  'industry',
                  tabData.industry,
                  'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
                )}
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
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaInfoCircle className="text-2xl text-[#0f5028]" aria-hidden="true" />
                    <h2 className="text-2xl font-serif font-semibold text-[#0f5028]">
                      Financial Info
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-slate-700">
                    Independent research tools, data libraries, and educational hubs to help you
                    compare investments and deepen your market knowledge.
                  </p>
                </div>
                {renderLinksGrid(
                  'financial',
                  tabData.financial,
                  'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                )}
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
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaWallet className="text-2xl text-[#0f5028]" aria-hidden="true" />
                    <h2 className="text-2xl font-serif font-semibold text-[#0f5028]">
                      Personal Finance
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-slate-700">
                    Consumer-focused tools that help you monitor markets, follow financial news, and
                    stay engaged with your own money decisions.
                  </p>
                </div>
                {renderLinksGrid(
                  'personal',
                  tabData.personal,
                  'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default Links;