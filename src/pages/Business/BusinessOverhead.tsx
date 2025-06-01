import React from 'react';

const BusinessOverheadContent: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-10">
      {/* Left Column – Core Info */}
      <div className="lg:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-[#0a4020]">Business Overhead Insurance</h1>
        <p className="mb-4">
          Business Overhead Expense (BOE) Insurance is designed to keep your company running if you're
          unable to work due to injury or illness. It covers essential operating costs like rent, utilities,
          employee salaries, and more—so your business can continue during your recovery.
        </p>
        <p className="mb-4">
          After a short waiting period—typically 30, 60, or 90 days—monthly benefits are paid until
          you recover or reach the policy’s maximum duration or payout.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#127038]">Key Coverage Highlights</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Premiums may be tax-deductible (consult your accountant)</li>
          <li>Coverage for partial disability and recurring conditions</li>
          <li>Waiver of premiums after extended disability</li>
          <li>Death benefit payable to your estate</li>
        </ul>
      </div>

      {/* Right Column – Supporting Details */}
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-xl font-semibold text-[#127038]">How It Works</h2>
        <p>
          BOE insurance is particularly vital for sole proprietors, small business owners, and partners.
          Eligible expenses include rent or mortgage interest, heat, hydro, water, employee wages,
          insurance premiums, property taxes, depreciation, and more.
        </p>
        <p>
          If your business operates under a partnership or cost-sharing agreement, only your share of the
          fixed expenses are considered eligible. The plan does not cover your own salary, inventory,
          startup costs, or the cost of goods sold.
        </p>

        <h2 className="text-xl font-semibold mt-6 text-[#127038]">Additional Protections</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Recurrence of Disability:</strong> If you return to work and relapse within 3 months, benefits resume without another waiting period.</li>
          <li><strong>Waiver of Premium:</strong> If you're disabled for 90+ days, your premiums may be waived.</li>
          <li><strong>Death Benefit:</strong> A lump sum is paid to your estate equal to up to 3 months of eligible overhead expenses.</li>
        </ul>

        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 rounded">
          <strong className="block font-semibold text-green-800 mb-2">Advisor Tip:</strong>
          <p className="text-green-900">
            Work with your Wise Financial Group Inc. advisor to tailor a plan that reflects your business
            structure and income needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverheadContent;
