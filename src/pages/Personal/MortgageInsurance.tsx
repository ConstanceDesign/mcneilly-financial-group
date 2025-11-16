import React from 'react';
import {
  FaHome,
  FaBalanceScale,
  FaCheckCircle,
  FaShieldAlt,
} from 'react-icons/fa';

const MortgageInsurance: React.FC = () => (
  <section
    aria-labelledby="mortgage-insurance-heading"
    className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-[#333333]"
  >
    {/* Left Column – Overview */}
    <div className="lg:w-1/2 space-y-5">
      <div className="inline-flex items-center gap-3 mb-1">
        <FaHome className="text-[#4b9328] text-2xl" aria-hidden="true" />
        <h1
          id="mortgage-insurance-heading"
          className="text-3xl font-semibold tracking-tight text-[#0f5028]"
        >
          Mortgage Insurance Options
        </h1>
      </div>

      <p className="leading-relaxed">
        Mortgage insurance protects your loved ones by paying off your mortgage if you pass away.
        There are two common approaches: lender-provided mortgage insurance or personally owned
        term life insurance.
      </p>
      <p className="leading-relaxed">
        While bank-issued mortgage insurance may seem convenient, individually owned policies often
        provide better value, more flexibility, and greater control over your coverage and
        beneficiaries.
      </p>

      <div className="pt-4 border-t border-[#d4d4d4]">
        <div className="flex items-center gap-2 mb-2">
          <FaBalanceScale className="text-[#4b9328]" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-[#0f5028]">
            Bank Mortgage Insurance – Pros &amp; Cons
          </h2>
        </div>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-2">
            <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
            <span>
              <strong>Pros:</strong> Easy to obtain, no medical exam upfront, bundled with mortgage
              payments
            </span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
            <span>
              <strong>Cons:</strong> Lender owns the policy, decreasing coverage, limited
              portability, beneficiary is always the bank
            </span>
          </li>
        </ul>
      </div>
    </div>

    {/* Right Column – Term Option */}
    <div className="lg:w-1/2 space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <FaShieldAlt className="text-[#4b9328]" aria-hidden="true" />
        <h2 className="text-2xl font-semibold text-[#0f5028]">
          Personally Owned Term Life Insurance
        </h2>
      </div>

      <ul className="space-y-2 mb-4">
        {[
          'You own the policy and name your own beneficiary',
          'Coverage amount stays level and can be tailored to your needs',
          'Policy stays with you even if you change lenders or pay off your mortgage early',
          'Can include options like conversion to permanent insurance and living benefit riders',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className="leading-relaxed">
        Choosing the right mortgage protection strategy can make a lasting difference in your
        family&apos;s financial security. Our advisors can help you compare options and make an
        informed choice that balances flexibility, cost, and control.
      </p>
    </div>
  </section>
);

export default MortgageInsurance;