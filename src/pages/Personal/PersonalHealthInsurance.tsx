import React from 'react';
import {
  FaHeartbeat,
  FaUserFriends,
  FaCheckCircle,
  FaLightbulb,
} from 'react-icons/fa';

const PersonalHealthInsurance: React.FC = () => (
  <section
    aria-labelledby="personal-health-heading"
    className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-[#333333]"
  >
    {/* Left Column – Overview */}
    <div className="lg:w-1/2 space-y-5">
      <div className="inline-flex items-center gap-3 mb-1">
        <FaHeartbeat className="text-[#4b9328] text-2xl" aria-hidden="true" />
        <h1
          id="personal-health-heading"
          className="text-3xl font-semibold tracking-tight text-[#0f5028]"
        >
          Private Health Insurance
        </h1>
      </div>

      <p className="leading-relaxed">
        While Canada&apos;s public health care system covers many services, it does not include
        dental, vision, or most prescription drugs. Private health insurance helps fill those gaps,
        offering peace of mind for everyday and unexpected medical expenses.
      </p>

      <div className="pt-4 border-t border-[#d4d4d4]">
        <div className="flex items-center gap-2 mb-2">
          <FaUserFriends className="text-[#4b9328]" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-[#0f5028]">
            Who Needs It?
          </h2>
        </div>
        <ul className="space-y-2 mb-4">
          {[
            'Self-employed individuals or contractors without group benefits',
            'Families seeking coverage for prescriptions, dental, and vision',
            'Retirees or part-time workers looking for additional protection',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Right Column – Coverage & Tips */}
    <div className="lg:w-1/2 space-y-5">
      <h2 className="text-2xl font-semibold text-[#0f5028]">
        Common Coverage Options
      </h2>
      <ul className="space-y-2 mb-4">
        {[
          'Prescription medications',
          'Dental cleanings and major procedures',
          'Vision care including glasses and exams',
          'Paramedical services (e.g., physiotherapy, massage)',
          'Catastrophic or critical illness coverage',
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
            Eligibility &amp; Enrollment Tips
          </span>
        </div>
        <p className="leading-relaxed text-sm sm:text-base text-[#0f5028] font-medium">
          Most insurers require that you&apos;re a Canadian resident covered under your provincial
          plan. Enrolling while you&apos;re healthy helps avoid exclusions for pre-existing
          conditions. If you&apos;re part of a couple or family, look for bundled options to save on
          premiums.
        </p>
      </div>

      <p className="text-sm text-[#666666] italic">
        Customizable health insurance can complement your government coverage and reduce
        out-of-pocket costs. Discuss your health needs and budget with a licensed advisor to choose
        the right plan.
      </p>
    </div>
  </section>
);

export default PersonalHealthInsurance;