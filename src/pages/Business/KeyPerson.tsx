import React from 'react';
import {
  FaUserTie,
  FaShieldAlt,
  FaUsersCog,
  FaCheckCircle,
  FaLightbulb,
} from 'react-icons/fa';

const KeyPersonContent: React.FC = () => {
  return (
    <section
      aria-labelledby="key-person-heading"
      className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12"
    >
      {/* Main Content */}
      <div className="lg:w-1/2 space-y-5 text-slate-800">
        {/* Title + Icon */}
        <div className="inline-flex items-center gap-3 mb-1">
          <FaUserTie className="text-emerald-700 text-2xl" aria-hidden="true" />
          <h1
            id="key-person-heading"
            className="text-3xl font-semibold tracking-tight text-[#0f5028]"
          >
            Key Person Insurance
          </h1>
        </div>

        <p className="leading-relaxed">
          Key Person Insurance is designed to protect your business from the financial impact of
          losing a vital team member due to death or disability. Whether they are a founder,
          executive, top salesperson, or subject-matter expert, losing a key employee can seriously
          disrupt operations, cash flow, and future growth.
        </p>

        <p className="leading-relaxed">
          These policies provide a financial cushion, giving your organization time and resources to
          recover, recruit, and train a suitable replacement—while also offering the potential for
          benefits to employees or their families, depending on how the plan is structured.
        </p>

        {/* Why It Matters */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <FaShieldAlt className="text-emerald-700" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-[#0f5028]">
              Why Key Person Coverage Matters
            </h2>
          </div>
          <ul className="space-y-2 text-slate-800">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-emerald-600" aria-hidden="true" />
              <span>Helps maintain operational and revenue continuity during transition</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-emerald-600" aria-hidden="true" />
              <span>Provides funds to recruit, onboard, and train successors</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-emerald-600" aria-hidden="true" />
              <span>Can include living benefits or support for the employee&apos;s family</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-emerald-600" aria-hidden="true" />
              <span>Signals long-term planning and strengthens your retention strategy</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Supporting Insights */}
      <div className="lg:w-1/2 space-y-5 text-slate-800">
        <div className="flex items-center gap-2">
          <FaUsersCog className="text-emerald-700" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-[#0f5028]">
            Protecting People and Performance
          </h2>
        </div>

        <p className="leading-relaxed">
          Many businesses underestimate the impact of losing a top contributor—until it happens. By
          proactively insuring key individuals, you demonstrate foresight, leadership, and a deep
          respect for the value your people bring to your organization.
        </p>

        <p className="leading-relaxed">
          Some key person plans are dual-purpose: they protect the business while also offering
          benefits to the insured employee or their loved ones. This flexibility can make the
          coverage a powerful recruitment, reward, and retention tool.
        </p>

        {/* Advisor Insight Callout */}
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/80 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="text-emerald-700" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide uppercase text-emerald-800">
              Advisor Insight
            </span>
          </div>
          <p className="text-sm sm:text-base text-emerald-900 font-medium leading-relaxed">
            Work with your advisor to map coverage to the roles that would be hardest to replace.
            Every business, and every key contributor, is unique—your protection strategy should be
            tailored to that reality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default KeyPersonContent;