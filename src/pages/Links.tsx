import React from 'react';
import { LinkIcon } from '@heroicons/react/24/solid';

const Links: React.FC = () => {
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Useful Links</h1>
        
        {/* Introduction Section */}
        <p className="text-lg text-gray-700 mb-8">
          Here are some valuable resources in the world of finance. These links cover a range of topics, from mutual funds to financial planning industry groups, helping you navigate and enhance your financial knowledge and strategy. Explore these sites to deepen your understanding of financial markets, investment options, and retirement planning.
        </p>
        
        {/* Mutual Fund Companies Section */}
        <section aria-labelledby="mutual-fund-companies" className="mb-8">
          <h2 id="mutual-fund-companies" className="text-2xl font-semibold text-gray-700 mb-4">Mutual Fund Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "AGF", url: "https://www.agf.com" },
              { name: "AIC Group of Funds", url: "https://www.aic.com" },
              { name: "AIM", url: "https://www.aimfunds.com" },
              { name: "CIFunds", url: "https://www.cifunds.com" },
              { name: "Dynamic Mutual Funds", url: "https://www.dynamic.ca" },
              { name: "Fidelity Investments", url: "https://www.fidelity.ca" },
              { name: "Mackenzie", url: "https://www.mackenzieinvestments.com" },
              { name: "Templeton", url: "https://www.templeton.com" }
            ].map((link) => (
              <div key={link.name} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-200 ease-in-out">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                  aria-label={`Visit ${link.name}`}
                  title={`Visit the ${link.name} website`}
                >
                  <span>{link.name}</span>
                  {/* <LinkIcon className="w-1 h-1 text-blue-600" /> */}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Groups Section */}
        <section aria-labelledby="industry-groups" className="mb-8">
          <h2 id="industry-groups" className="text-2xl font-semibold text-gray-700 mb-4">Industry Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Financial Planners Standards Council (FPSC)", url: "https://www.fpsc.ca" },
              { name: "Investment Fund Institute of Canada (IFIC)", url: "https://www.ific.ca" },
              { name: "Advocis: The Financial Advisors Association of Canada", url: "https://www.advocis.ca" },
              { name: "Canadian Association of Pre-Retirement Planners", url: "https://www.cprp.ca" },
              { name: "The Financial Planning Association (USA)", url: "https://www.fpanet.org" },
              { name: "Mutual Fund Dealers Association (MFDA)", url: "https://www.mfda.ca" }
            ].map((link) => (
              <div key={link.name} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-200 ease-in-out">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                  aria-label={`Visit ${link.name}`}
                  title={`Visit the ${link.name} website`}
                >
                  <span>{link.name}</span>
                  {/* <LinkIcon className="w-1 h-1 text-blue-600" /> */}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Information Section */}
        <section aria-labelledby="financial-information" className="mb-8">
          <h2 id="financial-information" className="text-2xl font-semibold text-gray-700 mb-4">Financial Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Fund Library", url: "https://www.fundlibrary.com" },
              { name: "Stock Formation", url: "https://www.stockformation.com" },
              { name: "Morningstar", url: "https://www.morningstar.com" },
              { name: "Globefund", url: "https://www.globefund.com" },
              { name: "Quicken", url: "https://www.quicken.com" },
              { name: "CANNEX", url: "https://www.cannex.com" },
              { name: "Investor Learning Centre", url: "https://www.investorlearning.ca" },
              { name: "Canada Customs and Revenue Agency", url: "https://www.cra-arc.gc.ca" }
            ].map((link) => (
              <div key={link.name} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-200 ease-in-out">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                  aria-label={`Visit ${link.name}`}
                  title={`Visit the ${link.name} website`}
                >
                  <span>{link.name}</span>
                  {/* <LinkIcon className="w-1 h-1 text-blue-600" /> */}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Finance Section */}
        <section aria-labelledby="personal-finance">
          <h2 id="personal-finance" className="text-2xl font-semibold text-gray-700 mb-4">Personal Finance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "RetireWeb", url: "https://www.retireweb.com" },
              { name: "Canoe", url: "https://www.canoe.com" },
              { name: "Yahoo Finance", url: "https://www.yahoo.com/finance" },
              { name: "Canada.com", url: "https://www.canada.com" },
              { name: "50 Plus", url: "https://www.50plus.ca" }
            ].map((link) => (
              <div key={link.name} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-200 ease-in-out">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                  aria-label={`Visit ${link.name}`}
                  title={`Visit the ${link.name} website`}
                >
                  <span>{link.name}</span>
                  {/* <LinkIcon className="w-1 h-1 text-blue-600" /> */}
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Image Section */}
      <div className="hidden md:block md:w-1/3 mt-8">
        <img 
          src="/images/links-image.jpg" 
          alt="Professional financial advisory" 
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Links;