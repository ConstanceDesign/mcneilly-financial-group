import React from 'react';
import {
  FaHeartbeat,
  FaStethoscope,
  FaShieldAlt,
  FaLightbulb,
  FaCheckCircle,
  FaUserFriends,
  FaChevronRight,
} from 'react-icons/fa';

const HealthInsuranceContent: React.FC = () => {
  return (
    <section
      aria-labelledby="health-insurance-heading"
      aria-label="Health insurance solutions for Canadian businesses and self-employed individuals"
      className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start"
    >
      {/* Left Column: Overview & Insights */}
      <div
        className="lg:w-1/2 space-y-5 text-[#333333]"
        role="region"
        aria-labelledby="health-insurance-heading"
      >
        {/* Title + Icon */}
        <header className="inline-flex items-center gap-3">
          {/* +10% icon */}
          <FaHeartbeat className="text-[#4b9328] text-[2.1rem]" aria-hidden="true" />
          <div>
            {/* +10% headline */}
            <h1
              id="health-insurance-heading"
              className="text-[2.1rem] font-semibold tracking-tight text-[#0f5028]"
            >
              Health Insurance
            </h1>

            {/* Invisible SEO / screen reader summary (no layout impact) */}
            <p className="sr-only">
              Health insurance solutions for Canadian business owners, self-employed professionals,
              and small companies. Learn about tax-efficient strategies, lifetime coverage options,
              eligibility requirements, and best practices for enrolling before health concerns
              arise.
            </p>
          </div>
        </header>

        {/* Spacing below headline now matches paragraph-to-paragraph spacing via parent space-y-5 */}
        <p className="leading-relaxed">
          Health insurance helps safeguard your finances from unexpected medical expenses. Choosing
          the right plan, one with strong lifetime coverage limits, comprehensive protection, and
          accessible enrollment options while you&apos;re still healthy, can make a meaningful
          difference over time.
        </p>

        <p className="leading-relaxed mb-10">
          If you&apos;re self-employed or running a small business, health insurance is not only a
          necessity, it can be a strategic tax advantage. Group benefits or cost-plus arrangements
          can make quality coverage more affordable for you and your employees.
        </p>

        <div className="pt-7 border-t border-[#d4d4d4]">
          {/* Headline-to-content spacing standardized to match “Best Practices…” */}
          <div className="flex items-center gap-2 mb-6">
            <FaShieldAlt className="text-[#4b9328] text-2xl" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-[#0f5028]">
              Key Advantages
            </h2>
          </div>

          <ul className="space-y-2 text-[#333333]" role="list">
            <li className="flex items-start gap-2" role="listitem">
              {/* small checkmark */}
              <FaCheckCircle className="mt-1.5 text-xs text-[#4b9328]" aria-hidden="true" />
              <span>Comprehensive lifetime coverage ($1M+ or unlimited is recommended)</span>
            </li>
            <li className="flex items-start gap-2" role="listitem">
              <FaCheckCircle className="mt-1.5 text-xs text-[#4b9328]" aria-hidden="true" />
              <span>Premiums can often be 100% tax-deductible for self-employed Canadians</span>
            </li>
            <li className="flex items-start gap-2" role="listitem">
              <FaCheckCircle className="mt-1.5 text-xs text-[#4b9328]" aria-hidden="true" />
              <span>Helps prevent financial hardship from future illness or injury</span>
            </li>
            <li className="flex items-start gap-2" role="listitem">
              <FaCheckCircle className="mt-1.5 text-xs text-[#4b9328]" aria-hidden="true" />
              <span>Available for families, including full-time students under age 25</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column: Eligibility & Strategy */}
      <div
        className="lg:w-1/2 space-y-5 text-[#333333]"
        role="region"
        aria-labelledby="best-practices-heading"
      >
        {/* Headline-to-content spacing standardized */}
        <div className="flex items-center gap-2 mb-7 mt-2">
          <FaStethoscope className="text-[#4b9328] text-2xl" aria-hidden="true" />
          <h2
            id="best-practices-heading"
            className="text-2xl font-semibold tracking-tight text-[#0f5028]"
          >
            Best Practices for Enrollment
          </h2>
        </div>

        <p className="leading-relaxed">
          Many individuals wait until they receive a diagnosis, such as diabetes before seeking
          coverage. Unfortunately, most pre-existing conditions are excluded or limited in new
          policies. The most effective strategy is to enroll proactively, before health concerns
          arise.
        </p>

        <p className="leading-relaxed mb-10">
          If an insurer offers coverage excluding pre-existing conditions, the policy may still be
          valuable. It can protect you and your family from future medical events that have not yet
          been diagnosed.
        </p>

        {/* Eligibility Reminder */}
        <aside
          className="mt-2 rounded-xl border border-[#8cbe3f] bg-[#f1f7ea] p-6 shadow-sm"
          aria-label="Eligibility reminder"
        >
          <div className="flex items-center gap-2 mb-3">
            <FaUserFriends className="text-[#4b9328] text-xl" aria-hidden="true" />
            <span className="text-md font-semibold tracking-wide uppercase text-[#0f5028]">
              Eligibility Reminder
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#0f5028] font-medium leading-relaxed">
            You must be a Canadian resident enrolled in a provincial or territorial government
            health plan. Dependent children are generally eligible if they are under 21, or up to 25
            if they are full-time students and financially dependent.
          </p>
        </aside>

        {/* Pro Tips */}
        <aside
          className="mt-2 rounded-xl border border-[#8cbe3f] bg-[#f1f7ea] p-6 shadow-sm"
          aria-label="Pro tips"
        >
          <div className="flex items-center gap-2 mb-3">
            <FaLightbulb className="text-[#4b9328] text-lg" aria-hidden="true" />
            <span className="text-md font-semibold tracking-wide uppercase text-[#0f5028]">
              Pro Tips
            </span>
          </div>

          <ul
            className="sm:text-base text-[#0f5028] font-medium leading-relaxed space-y-2"
            role="list"
          >
            <li className="flex items-start gap-2" role="listitem">
              <FaChevronRight className="mt-1.5 text-xs text-[#4b9328]" aria-hidden="true" />
              <span>Apply while you&apos;re healthy to avoid exclusions and surcharges.</span>
            </li>
            <li className="flex items-start gap-2" role="listitem">
              <FaChevronRight className="mt-1.5 text-xs text-[#4b9328]" aria-hidden="true" />
              <span>Explore group or association plans—even with as few as two people.</span>
            </li>
            <li className="flex items-start gap-2" role="listitem">
              <FaChevronRight className="mt-1.5 text-xs text-[#4b9328]" aria-hidden="true" />
              <span>Use cost-plus programs to reimburse out-of-pocket medical costs tax-efficiently.</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default HealthInsuranceContent;