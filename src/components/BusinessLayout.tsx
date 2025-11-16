import React from 'react';
import {
  FaUsers,
  FaShieldAlt,
  FaHeartbeat,
  FaCheckCircle,
  FaChartLine,
  FaLightbulb,
} from 'react-icons/fa';

const GroupInsuranceContent: React.FC = () => {
  return (
    <section
      aria-labelledby="group-insurance-heading"
      className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12"
    >
      {/* Text Content */}
      <div className="lg:w-1/2 space-y-5 text-slate-800">
        {/* Title + Icon */}
        <div className="inline-flex items-center gap-3 mb-1">
          <FaUsers className="text-emerald-700 text-2xl" aria-hidden="true" />
          <h1
            id="group-insurance-heading"
            className="text-3xl font-semibold tracking-tight text-[#0f5028]"
          >
            Group Insurance Plans
          </h1>
        </div>

        <p className="leading-relaxed">
          A strong group insurance plan is one of the most effective ways to attract and retain top
          talent. Offering health, life, and disability coverage demonstrates your commitment to
          your employees and their families—helping foster loyalty, reduce turnover, and improve
          overall job satisfaction.
        </p>

        <p className="leading-relaxed">
          Today&apos;s workforce is dynamic, and it&apos;s more important than ever to offer meaningful
          benefits. We work with a wide range of carriers to help businesses like yours implement
          group plans that are cost-effective, flexible, and sustainable over time.
        </p>

        <p className="leading-relaxed">
          Our approach considers your company&apos;s budget, future claims experience, legislative
          trends, and changes in the healthcare landscape to create plans tailored to your needs.
        </p>

        {/* Benefits */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <FaShieldAlt className="text-emerald-700" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-[#0f5028]">
              Benefits of Group Coverage
            </h2>
          </div>
          <ul className="space-y-2 text-slate-800">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-emerald-600" aria-hidden="true" />
              <span>Boosts employee satisfaction, engagement, and retention</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-emerald-600" aria-hidden="true" />
              <span>Plans can include health, dental, vision, life, and disability insurance</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-emerald-600" aria-hidden="true" />
              <span>Tax-deductible premiums for employers</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-emerald-600" aria-hidden="true" />
              <span>Options for small business cost-sharing and customization</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-emerald-600" aria-hidden="true" />
              <span>Coverage can extend to dependents and family members</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Secondary Content / Callout */}
      <div className="lg:w-1/2 space-y-5 text-slate-800">
        <div className="flex items-center gap-2">
          <FaChartLine className="text-emerald-700" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-[#0f5028]">Why Work With Us?</h2>
        </div>

        <p className="leading-relaxed">
          We partner with top-tier insurance providers to secure strong value and reliable service
          for your team. Whether you have two employees or two hundred, we help you navigate the
          options and ensure your plan evolves as your company grows.
        </p>

        {/* Expert Tip Callout */}
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/80 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="text-emerald-700" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide uppercase text-emerald-800">
              Expert Tip
            </span>
          </div>
          <p className="text-sm sm:text-base text-emerald-900 font-medium leading-relaxed">
            Employers offering even a well-designed basic benefits package gain a competitive hiring
            edge in today&apos;s market. It&apos;s a clear signal of stability, care, and long-term vision.
          </p>
        </div>

        {/* Extra reassurance block */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-100 bg-white/80 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <FaHeartbeat className="text-emerald-700" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-[#0f5028]">
                Support Your People
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Thoughtful benefits help your employees feel seen, supported, and confident in their
              future.
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-white/80 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <FaShieldAlt className="text-emerald-700" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-[#0f5028]">
                Protect Your Business
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              A well-structured plan balances cost control with meaningful coverage, supporting both
              your bottom line and your team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupInsuranceContent;