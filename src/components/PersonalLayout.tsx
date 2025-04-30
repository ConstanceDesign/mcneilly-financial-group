import React from "react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "index.css";

interface PersonalLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const PersonalLayout: React.FC<PersonalLayoutProps> = ({ children, pageTitle }) => {
  return (
    <>
        <title>{pageTitle} | Personal Insurance</title>
      
      <Navbar />

      <div className="bg-blue-50 min-h-screen w-full py-12 px-4 md:px-12">
        <div className="max-w-6xl mx-auto bg-white shadow-md md:shadow-lg rounded-lg p-6 md:p-12">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">{pageTitle}</h1>
            <div className="h-1 w-20 bg-blue-600 mt-3 rounded" />
          </header>
          <main className="space-y-6 text-gray-700">{children}</main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PersonalLayout;