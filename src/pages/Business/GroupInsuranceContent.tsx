import React from 'react';

const GroupInsuranceContent: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-10">
      {/* Text Content */}
      <div className="lg:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-[#0a4020]">Group Insurance Plans</h1>
        <p className="mb-4">
          A strong group insurance plan is one of the most effective ways to attract and retain top talent.
          Offering health, life, and disability coverage demonstrates your commitment to your employees and
          their families—helping foster loyalty, reduce turnover, and improve overall job satisfaction.
        </p>
        <p className="mb-4">
          Today's workforce is dynamic, and it's more important than ever to offer meaningful benefits. We
          work with a wide range of carriers to help businesses like yours implement group plans that are
          cost-effective, flexible, and sustainable over time.
        </p>
        <p className="mb-4">
          Our approach considers your company's budget, future claims experience, legislative trends, and
          changes in the healthcare landscape to create plans tailored to your needs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#127038]">Benefits of Group Coverage</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>Boosts employee satisfaction, engagement, and retention</li>
          <li>Plans can include health, dental, vision, life, and disability insurance</li>
          <li>Tax-deductible premiums for employers</li>
          <li>Options for small business cost-sharing and customization</li>
          <li>Coverage extends to dependents and family members</li>
        </ul>
      </div>

      {/* Secondary Content or Callout */}
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-xl font-semibold text-[#127038]">Why Work With Us?</h2>
        <p>
          We partner with top-tier insurance providers to secure the best value and service for your team.
          Whether you have two employees or two hundred, we help navigate the options and ensure your plan
          grows with your company.
        </p>
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 rounded">
          <strong className="block font-semibold text-green-800 mb-2">Expert Tip:</strong>
          <p className="text-green-900">
            Employers offering even basic coverage gain a competitive hiring edge in today’s market. It’s a
            sign of stability and long-term vision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupInsuranceContent;

