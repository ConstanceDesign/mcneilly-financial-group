import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUniversity,
  FaChartLine,
  FaInfoCircle,
  FaWallet
} from 'react-icons/fa';
import heroImage from '../images/wealth-hero.jpg'; // Replace with your actual image path

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

const sectionColors = {
  mutual: 'bg-[#496989]',
  industry: 'bg-[#58A399]',
  financial: 'bg-[#A8CD9F]',
  // personal: 'bg-[#E2F4C5]',
};

const Links: React.FC = () => {
  return (
    <div className="text-[#333]">

      {/* Hero Section */}
      <section className="relative bg-gray-200">
        <img
          src={heroImage}
          alt="Investing for the future"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <h1 className="text-4xl text-white font-bold text-center px-4 py-2">Useful Links</h1>
          <h3 className="text-lg md:text-xl mb-6 max-w-2xl">
            Secure your future with expert financial guidance.
          </h3>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-18">
        <motion.h2
          className="text-4xl uppercase font-semibold text-center mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
        </motion.h2>

        <motion.p
          className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        </motion.p>

        <div className="space-y-12">

          {/* MUTUAL FUND COMPANIES */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <FaUniversity className="text-2xl text-[#496989]" />
              <h3 className="text-2xl font-semibold">Mutual Fund Companies</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: "AGF", url: "https://www.agf.com" },
                { name: "Invesco", url: "https://www.invesco.com/ca/en/home.html" },
                { name: "CIFunds", url: "https://www.cifunds.com" },
                { name: "Dynamic Mutual Funds", url: "https://www.dynamic.ca" },
                { name: "Fidelity Investments", url: "https://www.fidelity.ca/en/" },
                { name: "Mackenzie", url: "https://www.mackenzieinvestments.com/en?userRole=investor" },
                { name: "Franklin Templeton", url: "https://www.templeton.com" },
              ].map(link => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${sectionColors.mutual} text-white font-semibold rounded-sm p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform block`}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ once: true }}
                  variants={fadeInScale}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.section>

          {/* INDUSTRY GROUPS */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <FaChartLine className="text-2xl text-[#58A399]" />
              <h3 className="text-2xl font-semibold">Industry Groups</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Investment Fund Institute of Canada", url: "https://www.ific.ca" },
                { name: "Advocis", url: "https://www.advocis.ca" },
                { name: "Mutual Fund Dealers Association", url: "https://www.mfda.ca" },
              ].map(link => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${sectionColors.industry} text-white font-semibold rounded-sm p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform block`}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ once: true }}
                  variants={fadeInScale}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.section>

          {/* FINANCIAL INFORMATION */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <FaInfoCircle className="text-2xl text-[#A8CD9F]" />
              <h3 className="text-2xl font-semibold">Financial Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Fund Library", url: "https://www.fundlibrary.com" },
                { name: "Morningstar", url: "https://www.morningstar.com" },
                { name: "Globefund", url: "https://www.globefund.com" },
                { name: "Quicken", url: "https://www.quicken.com" },
                { name: "CANNEX", url: "https://www.cannex.com" },
                { name: "Investor Learning Centre", url: "https://www.investorlearning.ca" },
                { name: "CRA", url: "https://www.cra-arc.gc.ca" },
                { name: "Yahoo Finance", url: "https://www.yahoo.com/finance" },
              ].map(link => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${sectionColors.financial} font-semibold rounded-sm p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform block`}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ once: true }}
                  variants={fadeInScale}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.section>

          {/* PERSONAL FINANCE */}
          {/* <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4 text-[#99a97f]">
              <FaWallet className="text-2xl" />
              <h3 className="text-2xl font-semibold">Personal Finance</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { name: "Yahoo Finance", url: "https://www.yahoo.com/finance" }
              ].map(link => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${sectionColors.personal} text-[#697556] font-semibold rounded-md p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform block`}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ once: true }}
                  variants={fadeInScale}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div> */}
          {/* </motion.section> */}
        </div>
      </div>
    </div>
  );
};

export default Links;