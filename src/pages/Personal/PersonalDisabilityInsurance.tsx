import React from 'react';
import {
  FaWheelchair,
  FaShieldAlt,
  FaCheckCircle,
  FaLightbulb,
} from 'react-icons/fa';

const PersonalDisabilityInsurance: React.FC = () => (
  <section
    aria-labelledby="personal-disability-heading"
    className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-[#333333]"
  >
    {/* Left Column – Overview */}
    <div className="lg:w-1/2 space-y-5">
      <div className="inline-flex items-center gap-3 mb-1">
        <FaWheelchair className="text-[#4b9328] text-2xl" aria-hidden="true" />
        <h1
          id="personal-disability-heading"
          className="text-3xl font-semibold tracking-tight text-[#0f5028]"
        >
          Personal Disability Insurance
        </h1>
      </div>

      <p className="leading-relaxed">
        Your ability to earn an income is one of your most valuable assets. Personal disability
        insurance protects your income if you&apos;re unable to work due to injury or illness. It
        ensures you can continue meeting financial obligations while focusing on your recovery.
      </p>

      <div className="pt-4 border-t border-[#d4d4d4]">
        <div className="flex items-center gap-2 mb-2">
          <FaShieldAlt className="text-[#4b9328]" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-[#0f5028]">
            How It Works
          </h2>
        </div>
        <p className="leading-relaxed mb-4">
          Disability insurance replaces a portion of your income through monthly payments while
          you&apos;re disabled. Policies vary based on definitions like &quot;own occupation&quot;
          vs. &quot;any occupation,&quot; waiting periods, and benefit duration.
        </p>
      </div>
    </div>

    {/* Right Column – Importance & Key Considerations */}
    <div className="lg:w-1/2 space-y-5">
      <h2 className="text-2xl font-semibold text-[#0f5028]">
        Why It&apos;s Important
      </h2>
      <ul className="space-y-2 mb-4">
        {[
          'Disabilities are more likely than premature death during working years',
          'Protects your lifestyle and financial independence',
          'Benefits can be used for daily expenses, medical bills, or savings preservation',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold text-[#0f5028]">
        Key Considerations
      </h2>
      <ul className="space-y-2">
        {[
          'Choose a waiting period that aligns with your emergency savings',
          'Understand benefit duration—some policies cover until age 65',
          'Ask about recurrence and waiver of premium clauses',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="rounded-xl border border-[#8cbe3f] bg-[#f1f7ea] p-5 shadow-sm mt-4">
        <div className="flex items-center gap-2 mb-2">
          <FaLightbulb className="text-[#4b9328]" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wide uppercase text-[#0f5028]">
            Advisor Insight
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#0f5028] font-medium leading-relaxed">
          Disability insurance can be tailored to your profession, budget, and risk tolerance. Work
          with an advisor to find a protection plan that fits your income and lifestyle.
        </p>
      </div>
    </div>
  </section>
);

export default PersonalDisabilityInsurance;