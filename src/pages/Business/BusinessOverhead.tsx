import React from 'react';
import {
  FaBuilding,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaChartLine,
  FaLightbulb
} from 'react-icons/fa';

const BusinessOverheadContent: React.FC = () => {
  return (
    <section
      aria-labelledby="business-overhead-heading"
      className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12"
    >
      {/* Core Info */}
      <div className="lg:w-1/2 space-y-5 text-[#333333]">
        {/* Title + Icon */}
        <div className="inline-flex items-center gap-3 mb-1">
          <FaBuilding className="text-[#4b9328] text-2xl" aria-hidden="true" />
          <h1
            id="business-overhead-heading"
            className="text-3xl font-semibold tracking-tight text-[#0f5028]"
          >
            Business Overhead Insurance
          </h1>
        </div>

        <p className="leading-relaxed">
          Business Overhead Expense (BOE) Insurance keeps your business running if you become unable
          to work due to illness or injury. It covers essential operating costs such as rent,
          utilities, administrative costs, and employee wages — ensuring business continuity during
          your recovery.
        </p>

        <p className="leading-relaxed">
          After a short elimination period — typically 30, 60, or 90 days — monthly benefits are
          issued until recovery, policy expiry, or benefit maximum is reached.
        </p>

        {/* Key Highlights */}
        <div className="pt-4 border-t border-[#d4d4d4]">
          <div className="flex items-center gap-2 mb-3">
            <FaFileInvoiceDollar className="text-[#4b9328]" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-[#0f5028]">
              Key Coverage Highlights
            </h2>
          </div>

          <ul className="space-y-2 text-[#333333]">
            {[
              'Premiums may be tax-deductible (confirm with your accountant)',
              'Coverage for partial disability and recurring conditions',
              'Waiver of premiums after extended disability period',
              'Death benefit payable to your estate',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Supporting Details */}
      <div className="lg:w-1/2 space-y-5 text-[#333333]">
        <div className="flex items-center gap-2">
          <FaChartLine className="text-[#4b9328]" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-[#0f5028]">
            How It Works
          </h2>
        </div>

        <p className="leading-relaxed">
          BOE insurance is particularly valuable for incorporated professionals, clinic owners,
          partners, and small business operators. Eligible reimbursable expenses often include:
          commercial rent, utilities, employee wages, property taxes, insurance premiums, equipment
          depreciation, and certain contracted services.
        </p>

        <p className="leading-relaxed">
          When operating under a partnership or shared-cost arrangement, only your proportional share
          of qualifying overhead is considered eligible. BOE does not cover your personal income,
          inventory, start-up expenses, or cost of goods sold.
        </p>

        {/* Additional Protections */}
        <div className="pt-4 border-t border-[#d4d4d4]">
          <h2 className="text-xl font-semibold text-[#0f5028] mb-3">Additional Protections</h2>
          <ul className="space-y-2 text-[#333333]">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
              <span>
                <strong>Recurrence of Disability:</strong> If you return to work and relapse within 3
                months, benefits may continue without new waiting periods.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
              <span>
                <strong>Waiver of Premium:</strong> After extended disability (often 90+ days), premiums
                may be waived for the duration of the claim period.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
              <span>
                <strong>Death Benefit:</strong> A lump-sum payment, often equivalent to 1–3 months of
                qualifying overhead, is paid to your estate.
              </span>
            </li>
          </ul>
        </div>

        {/* Advisor Tip */}
        <div className="mt-4 rounded-xl border border-[#8cbe3f] bg-[#f1f7ea] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="text-[#4b9328]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide uppercase text-[#0f5028]">
              Advisor Tip
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#0f5028] font-medium leading-relaxed">
            Consult with your Wise Financial Group Inc. advisor to customize coverage based on your
            revenue structure, business entity type, and projected overhead levels.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessOverheadContent;