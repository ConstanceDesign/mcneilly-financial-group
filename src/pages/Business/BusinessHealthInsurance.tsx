import React from 'react';

const HealthInsuranceContent: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      {/* Left Column: Overview & Insights */}
      <div className="lg:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-[#0a4020]">Health Insurance Solutions</h1>
        <p className="mb-4">
          Health insurance safeguards your finances from unexpected medical expenses. It’s essential to select a plan
          with strong lifetime coverage limits, comprehensive protection, and accessible enrollment options while you’re
          still healthy.
        </p>
        <p className="mb-4">
          If you're self-employed or running a small business, health insurance is not only a necessity—it can also be
          a powerful tax advantage. Group benefits or Cost Plus arrangements can make quality coverage more affordable
          for you and your employees.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#127038]">Key Advantages</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Comprehensive lifetime coverage ($1M+ or unlimited recommended)</li>
          <li>100% tax-deductible for self-employed Canadians</li>
          <li>Prevents financial hardship from future illness or injury</li>
          <li>Available for families, including full-time students under 25</li>
        </ul>
      </div>

      {/* Right Column: Eligibility & Strategy */}
      <div className="lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-[#127038]">Best Practices for Enrollment</h2>
        <p className="mb-4">
          Many individuals wait until a diagnosis—such as diabetes—before seeking coverage. Unfortunately, most
          pre-existing conditions are excluded from new policies. The best approach is to enroll proactively, before
          health issues arise.
        </p>
        <p className="mb-4">
          If an insurer offers coverage excluding pre-existing conditions, the policy may still be valuable. It can
          protect you and your family from future medical events not yet diagnosed.
        </p>

        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 rounded">
          <strong className="block font-semibold text-green-800 mb-2">Eligibility Reminder:</strong>
          <p className="text-green-900">
            You must be a Canadian resident enrolled in a provincial or territorial government health plan. Dependent
            children must be under 21 (or 25 if full-time students) to qualify for extended family benefits.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-2 text-[#0a4020]">Pro Tips</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Apply while healthy to avoid exclusions</li>
          <li>Explore group options even with just two people</li>
          <li>Use Cost Plus to reimburse out-of-pocket health costs tax-efficiently</li>
        </ul>
      </div>
    </div>
  );
};

export default HealthInsuranceContent;