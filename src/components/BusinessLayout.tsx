import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import 'index.css';

interface BusinessLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const BusinessLayout: React.FC<BusinessLayoutProps> = ({ children, pageTitle }) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle} | Business Insurance</title>
      </Helmet>

      <Navbar />

      <div className="bg-gray-50 min-h-screen w-full py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto bg-white shadow-md md:shadow-lg rounded-lg p-6 md:p-12">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{pageTitle}</h1>
            <div className="h-1 w-20 bg-green-600 mt-3 rounded" />
          </header>
          <main className="space-y-6 text-gray-800">{children}</main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BusinessLayout;