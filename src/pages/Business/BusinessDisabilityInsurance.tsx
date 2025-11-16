import React from 'react';
import {
  FaWheelchair,
  FaShieldAlt,
  FaChartBar,
  FaInfoCircle,
  FaLightbulb,
} from 'react-icons/fa';

const DisabilityInsuranceContent: React.FC = () => {
  const riskRows = [
    { age: 25, male: '40.7%', female: '46.8%' },
    { age: 30, male: '38.9%', female: '44.6%' },
    { age: 35, male: '37.1%', female: '41.9%' },
    { age: 40, male: '35.1%', female: '38.3%' },
  ];

  return (
    <section
      aria-labelledby="disability-insurance-heading"
      className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start"
    >
      {/* Left Column: Overview & Features */}
      <div className="lg:w-1/2 space-y-5 text-[#333333]">
        {/* Title + Icon */}
        <div className="inline-flex items-center gap-3 mb-1">
          <FaWheelchair className="text-[#4b9328] text-2xl" aria-hidden="true" />
          <h1
            id="disability-insurance-heading"
            className="text-3xl font-semibold tracking-tight text-[#0f5028]"
          >
            Disability Insurance
          </h1>
        </div>

        <p className="leading-relaxed">
          Disability insurance provides critical income protection if you are unable to work due to
          illness or injury. It helps ensure that your financial obligations are met—covering
          essentials like housing, groceries, and ongoing bills—while you recover.
        </p>

        <p className="leading-relaxed">
          Policies can differ by benefit type, definition of disability (own occupation vs. any
          occupation), elimination periods, and benefit durations. Some contracts include coverage
          for recurring disabilities or offer residual benefits if you can only return to work
          part-time.
        </p>

        {/* Why It Matters */}
        <div className="pt-4 border-t border-[#d4d4d4]">
          <div className="flex items-center gap-2 mb-3">
            <FaShieldAlt className="text-[#4b9328]" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-[#0f5028]">Why It Matters</h2>
          </div>
          <ul className="space-y-2 text-[#333333]">
            <li className="flex items-start gap-2">
              <FaInfoCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
              <span>Income is often your most valuable asset—protecting it is essential.</span>
            </li>
            <li className="flex items-start gap-2">
              <FaInfoCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
              <span>Long-term disability is statistically more likely than premature death before 65.</span>
            </li>
            <li className="flex items-start gap-2">
              <FaInfoCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
              <span>
                Many policies include return-to-work incentives and options for future benefit increases.
              </span>
            </li>
          </ul>
        </div>

        {/* Advisor Insight */}
        <div className="mt-4 rounded-xl border border-[#8cbe3f] bg-[#f1f7ea] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="text-[#4b9328]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide uppercase text-[#0f5028]">
              Advisor Insight
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#0f5028] font-medium leading-relaxed">
            Many people purchase life insurance long before they consider disability coverage, even
            though the odds of experiencing a disability are significantly higher. A tailored
            disability plan helps protect the lifestyle you&apos;ve worked hard to build.
          </p>
        </div>
      </div>

      {/* Right Column: Statistics Table */}
      <div className="lg:w-1/2 space-y-5 text-[#333333]">
        <div className="flex items-center gap-2">
          <FaChartBar className="text-[#4b9328]" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-[#0f5028]">
            Disability Risk by Age
          </h2>
        </div>

        <p className="leading-relaxed">
          The table below highlights the percentage of males and females who will experience a
          disability lasting 90 days or more before age 65. These statistics underscore how
          significant the risk can be at every stage of a working life.
        </p>

        <div className="overflow-x-auto rounded-lg border border-[#d4d4d4] shadow-sm bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#0f5028] text-white">
              <tr>
                <th scope="col" className="py-2.5 px-4 font-semibold uppercase tracking-wide text-xs">
                  Age
                </th>
                <th scope="col" className="py-2.5 px-4 font-semibold uppercase tracking-wide text-xs">
                  Male (%)
                </th>
                <th scope="col" className="py-2.5 px-4 font-semibold uppercase tracking-wide text-xs">
                  Female (%)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {riskRows.map((row) => (
                <tr key={row.age} className="odd:bg-white even:bg-[#f7f7f7]">
                  <td className="py-2.5 px-4 font-medium text-[#0f5028]">{row.age}</td>
                  <td className="py-2.5 px-4 text-[#333333]">{row.male}</td>
                  <td className="py-2.5 px-4 text-[#333333]">{row.female}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-[#666666] italic flex items-start gap-2">
          <FaInfoCircle className="mt-0.5 text-[#4b9328] flex-shrink-0" aria-hidden="true" />
          <span>
            Source: 1985 Commissioner&apos;s Disability Table A &amp; CIA 86–92 Aggregate Mortality Table.
            These figures are for illustration only and may not reflect current experience.
          </span>
        </p>
      </div>
    </section>
  );
};

export default DisabilityInsuranceContent;