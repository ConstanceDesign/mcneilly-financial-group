import React from 'react';

const BuySellContent: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-10">
      {/* Main Text Content */}
      <div className="lg:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-[#0a4020]">Funding Buy-Sell Agreements</h1>
        <p className="mb-4">
          A Buy-Sell agreement funded with life insurance ensures business continuity when a partner passes
          away or can no longer participate in the business. This strategy provides the necessary liquidity
          for the surviving partners to purchase the deceased’s share from their heirs, minimizing disruption.
        </p>
        <p className="mb-4">
          In essence, a Buy-Sell agreement acts as a “business will.” It is a formal, legally binding document
          outlining how ownership is transferred and funded—typically through a life insurance policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#127038]">Why It Matters</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Ensures a smooth, pre-arranged ownership transition</li>
          <li>Provides immediate liquidity to surviving shareholders</li>
          <li>Protects the financial interests of the deceased partner’s heirs</li>
          <li>Reduces the risk of disputes or legal challenges</li>
          <li>Helps preserve operational and financial stability</li>
        </ul>
      </div>

      {/* Supporting Insights */}
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-xl font-semibold text-[#127038]">How We Help</h2>
        <p>
          We collaborate with your legal and accounting advisors to structure the Buy-Sell agreement
          correctly. Our team ensures the insurance component is appropriately designed to support your
          business structure and succession goals.
        </p>

        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 rounded">
          <strong className="block font-semibold text-green-800 mb-2">Planning Tip:</strong>
          <p className="text-green-900">
            Don’t delay funding your agreement. Life insurance eligibility depends on age, health, and
            financial status. Waiting can lead to higher premiums—or disqualification altogether.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuySellContent;