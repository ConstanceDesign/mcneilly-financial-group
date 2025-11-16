import React from 'react';
import {
  FaHourglassHalf,
  FaCheckCircle,
  FaLightbulb,
} from 'react-icons/fa';

const TermInsurance: React.FC = () => (
  <section
    aria-labelledby="term-insurance-heading"
    className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-[#333333]"
  >
    {/* Left Column – Overview */}
    <div className="lg:w-1/2 space-y-5">
      <div className="inline-flex items-center gap-3 mb-1">
        <FaHourglassHalf className="text-[#4b9328] text-2xl" aria-hidden="true" />
        <h1
          id="term-insurance-heading"
          className="text-3xl font-semibold tracking-tight text-[#0f5028]"
        >
          Term Life Insurance
        </h1>
      </div>

      <p className="leading-relaxed">
        Term life insurance offers affordable, temporary protection for a set number of years
        (e.g., 10, 20, or 30 years). It’s an ideal option for individuals and families wanting to
        cover financial responsibilities during key life stages, such as paying off a mortgage
        or raising children.
      </p>
      <p className="leading-relaxed">
        Understanding your insurance needs—including how long you require coverage and how those
        needs might change over time—is essential. A financial needs analysis helps determine
        the right coverage amount and term length.
      </p>

      <div className="pt-4 border-t border-[#d4d4d4]">
        <h2 className="text-2xl font-semibold text-[#0f5028] mb-3">
          Key Considerations
        </h2>
        <ul className="space-y-2 mb-4">
          {[
            'Ideal for debt coverage, income replacement, and education funding during working years',
            'Lower premiums compared to whole life insurance',
            'Renewable and convertible options provide future flexibility',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Right Column – Pitfalls & Strategy */}
    <div className="lg:w-1/2 space-y-5">
      <h2 className="text-2xl font-semibold text-[#0f5028]">
        Avoiding Common Pitfalls
      </h2>
      <ul className="space-y-2 mb-4">
        <li className="flex items-start gap-2">
          <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
          <span>
            <strong>Expiring Coverage:</strong> Renewing term policies can be costly. Plan ahead for
            your long-term needs and consider conversion options before your term ends.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
          <span>
            <strong>Preferred Underwriting Confusion:</strong> Health classifications such as
            "preferred" or "standard" can influence your premium. Work with a qualified advisor to
            navigate the process.
          </span>
        </li>
      </ul>

      <p className="leading-relaxed">
        Riders like waiver of premium, accidental death, and child protection can enhance your
        policy. Be sure to explore all available options before selecting your plan.
      </p>

      <div className="rounded-xl border border-[#8cbe3f] bg-[#f1f7ea] p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <FaLightbulb className="text-[#4b9328]" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wide uppercase text-[#0f5028]">
            Strategy Tip
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#0f5028] font-medium leading-relaxed">
          Term life insurance works best when combined with a tailored strategy. Let an advisor help
          you craft a plan that balances affordability, flexibility, and peace of mind across all
          stages of life.
        </p>
      </div>
    </div>
  </section>
);

export default TermInsurance;