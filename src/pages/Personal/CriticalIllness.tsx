import React from 'react';
import {
  FaStethoscope,
  FaHeartbeat,
  FaCheckCircle,
  FaLightbulb,
} from 'react-icons/fa';

const CriticalIllness: React.FC = () => (
  <section
    aria-labelledby="critical-illness-heading"
    className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-[#333333]"
  >
    {/* Left Column – Overview */}
    <div className="lg:w-1/2 space-y-5">
      <div className="inline-flex items-center gap-3 mb-1">
        <FaStethoscope className="text-[#4b9328] text-2xl" aria-hidden="true" />
        <h1
          id="critical-illness-heading"
          className="text-3xl font-semibold tracking-tight text-[#0f5028]"
        >
          Critical Illness Insurance
        </h1>
      </div>

      <p className="leading-relaxed">
        Critical illness insurance provides a tax-free lump-sum payment if you&apos;re diagnosed
        with a covered life-altering condition. Unlike disability insurance, the benefit is paid
        even if you&apos;re still able to work.
      </p>
      <p className="leading-relaxed">
        This coverage helps you handle medical expenses, travel for treatment, supplement income,
        or simply focus on recovery without financial stress. There are no restrictions on how you
        use the benefit.
      </p>

      <div className="pt-4 border-t border-[#d4d4d4]">
        <div className="flex items-center gap-2 mb-3">
          <FaHeartbeat className="text-[#4b9328]" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-[#0f5028]">
            Why Choose Critical Illness Coverage?
          </h2>
        </div>
        <ul className="space-y-2">
          {[
            'Receive funds upon diagnosis of a covered condition',
            'Use the money however you choose — no receipts required',
            'Coverage typically includes cancer, heart attack, stroke, and more',
            'Return-of-premium options may refund your payments if you remain healthy',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Right Column – Additional Insights */}
    <div className="lg:w-1/2 space-y-5">
      <div className="rounded-xl border border-[#8cbe3f] bg-[#f1f7ea] p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <FaLightbulb className="text-[#4b9328]" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wide uppercase text-[#0f5028]">
            Added Value
          </span>
        </div>
        <p className="leading-relaxed text-sm sm:text-base text-[#0f5028] font-medium">
          If you pass away while the policy is in force, some plans offer a refund of premiums to
          your beneficiary. This added feature enhances value for long-term peace of mind.
        </p>
      </div>

      <p className="leading-relaxed">
        Whether you want to explore alternative treatments, seek out-of-country care, or hire
        additional support during recovery, critical illness coverage puts you in control at a
        time when options matter most.
      </p>
    </div>
  </section>
);

export default CriticalIllness;