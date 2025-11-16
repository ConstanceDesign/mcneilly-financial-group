import React from 'react';
import {
  FaTree,
  FaInfinity,
  FaCheckCircle,
  FaLightbulb,
} from 'react-icons/fa';

const PermanentInsurance: React.FC = () => (
  <section
    aria-labelledby="permanent-insurance-heading"
    className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-[#333333]"
  >
    {/* Left Column – Overview */}
    <div className="lg:w-1/2 space-y-5">
      <div className="inline-flex items-center gap-3 mb-1">
        <FaTree className="text-[#4b9328] text-2xl" aria-hidden="true" />
        <h1
          id="permanent-insurance-heading"
          className="text-3xl font-semibold tracking-tight text-[#0f5028]"
        >
          Permanent Life Insurance
        </h1>
      </div>

      <p className="leading-relaxed">
        Permanent life insurance provides lifelong coverage and guarantees a tax-free death benefit
        to your beneficiaries. Unlike term insurance, permanent policies can also build cash value
        over time, making them a flexible tool for estate planning, final expenses, and legacy
        building.
      </p>
      <p className="leading-relaxed">
        This type of insurance is ideal for individuals who want to ensure long-term financial
        protection, leave a legacy for loved ones, or offset final expenses and outstanding debts in
        retirement.
      </p>

      <div className="pt-4 border-t border-[#d4d4d4]">
        <div className="flex items-center gap-2 mb-2">
          <FaInfinity className="text-[#4b9328]" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-[#0f5028]">
            Why Choose Permanent Insurance?
          </h2>
        </div>
        <ul className="space-y-2 mb-4">
          {[
            'Coverage never expires as long as premiums are paid',
            'Can build tax-advantaged cash value',
            'May supplement retirement income or be used for emergencies',
            'Ensures final expenses are covered and estate plans are secure',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Right Column – Use Cases & Strategy */}
    <div className="lg:w-1/2 space-y-5">
      <h2 className="text-2xl font-semibold text-[#0f5028]">
        Common Use Cases
      </h2>
      <ul className="space-y-2 mb-4">
        {[
          'Final expense planning (e.g., funeral costs, outstanding debts)',
          'Leaving an inheritance to children or grandchildren',
          'Providing income for a surviving spouse',
          'Charitable giving through beneficiary designation',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="rounded-xl border border-[#8cbe3f] bg-[#f1f7ea] p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <FaLightbulb className="text-[#4b9328]" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wide uppercase text-[#0f5028]">
            Planning Insight
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#0f5028] font-medium leading-relaxed">
          Many people start with term insurance early in life and later convert to permanent
          coverage. This allows for affordable early protection with the option to secure lifetime
          coverage without additional medical underwriting later.
        </p>
      </div>

      <p className="leading-relaxed">
        Our advisors will help you evaluate your budget and long-term goals to determine the best
        permanent insurance product for your situation. Whether you&apos;re planning your legacy or
        safeguarding your family&apos;s future, we&apos;re here to guide you every step of the way.
      </p>
    </div>
  </section>
);

export default PermanentInsurance;