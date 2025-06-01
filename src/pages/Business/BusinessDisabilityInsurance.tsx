import React from 'react';

const DisabilityInsuranceContent: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      {/* Left Column: Overview & Features */}
      <div className="lg:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-[#0a4020]">Disability Insurance</h1>
        <p className="mb-4">
          Disability insurance provides critical income protection if you are unable to work due to illness or injury.
          It ensures that your financial obligations are met—covering essentials like housing, groceries, and bills—while
          you recover.
        </p>
        <p className="mb-4">
          Policies vary by benefit type, definition of disability (own occupation vs. any occupation), elimination periods,
          and benefit durations. Some even include coverage for recurring disabilities or offer a residual benefit if
          you're only partially disabled.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#127038]">Why It Matters</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Income is often your most valuable asset—protect it.</li>
          <li>Disabilities are more likely than premature death before age 65.</li>
          <li>Policies can include return-to-work incentives and future benefit increases.</li>
        </ul>

        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 rounded">
          <strong className="block font-semibold text-green-800 mb-2">Advisor Insight:</strong>
          <p className="text-green-900">
            Many individuals buy life insurance before considering disability coverage, even though the odds of becoming
            disabled are far higher. Talk to your advisor about proper income protection.
          </p>
        </div>
      </div>

      {/* Right Column: Statistics Table */}
      <div className="lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-[#127038]">Disability Risk by Age</h2>
        <p className="mb-4">
          The table below highlights the percentage of males and females who will be disabled for 90 days or more before
          age 65. These statistics underscore the real risk that disability presents at every stage of life.
        </p>

        <div className="overflow-x-auto border rounded shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#127038] text-white">
              <tr>
                <th className="py-2 px-4 font-semibold">Age</th>
                <th className="py-2 px-4 font-semibold">Male (%)</th>
                <th className="py-2 px-4 font-semibold">Female (%)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { age: 25, male: '40.7%', female: '46.8%' },
                { age: 30, male: '38.9%', female: '44.6%' },
                { age: 35, male: '37.1%', female: '41.9%' },
                { age: 40, male: '35.1%', female: '38.3%' },
              ].map(row => (
                <tr key={row.age} className="even:bg-gray-50">
                  <td className="py-2 px-4">{row.age}</td>
                  <td className="py-2 px-4">{row.male}</td>
                  <td className="py-2 px-4">{row.female}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-gray-600 italic">
          Source: 1985 Commissioner’s Disability Table A & CIA 86–92 Aggregate Mortality Table
        </p>
      </div>
    </div>
  );
};

export default DisabilityInsuranceContent;