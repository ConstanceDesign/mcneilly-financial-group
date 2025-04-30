import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6">
      <div className="lg:w-1/2 pr-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Our Financial Philosophy</h1>
        <p className="text-lg text-gray-700 mb-4">
          Patrick McNeilly, a dedicated financial advisor, builds lasting relationships with clients through the development of personalized financial plans. These plans are designed to meet their unique values and long-term financial aspirations. Patrick’s holistic approach encompasses investment, insurance, tax, and estate planning strategies tailored to each client’s specific needs.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          As a trusted financial partner, Patrick serves as the chief financial advisor, ensuring seamless coordination with clients' other professionals, such as tax accountants and legal advisors. Additionally, if necessary, he draws upon his extensive network of professionals to provide comprehensive solutions.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Patrick’s investment philosophy is rooted in conservatism, prioritizing safety and security. By working within each client’s carefully defined risk profile, he builds portfolios that meet their financial goals without exposing them to unnecessary risk.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Comprehensive income tax planning and tax minimization are central to Patrick's strategy. He incorporates advanced techniques such as income splitting, family trusts, and leverage strategies, ensuring that his clients' financial plans are optimized for tax efficiency.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Patrick’s commitment to continuous monitoring and proactive management of client portfolios ensures that opportunities arising from changing circumstances are seized. Regular annual reviews allow him to make informed adjustments, keeping the plan aligned with his clients' evolving needs.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Accessibility is key to Patrick’s client-first philosophy. He is committed to providing timely responses—whether by phone, email, or in-person meetings. All phone calls are returned on the same business day, and email inquiries are answered or acknowledged within 24 hours.
        </p>
        <p className="text-lg font-semibold text-gray-800 mb-4">
          Patrick McNeilly B.A., B. Comm.
        </p>
      </div>
      <div className="lg:w-1/2 mt-6 lg:mt-0">
        <img
          src="/path-to-image.jpg" // Replace with your image path
          alt="Patrick McNeilly, Financial Advisor"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>     
    </div>
  );
};

export default About;