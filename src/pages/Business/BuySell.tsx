import React from 'react';
import {
  FaHandshake,
  FaBalanceScale,
  FaCheckCircle,
  FaFileSignature,
  FaLightbulb,
} from 'react-icons/fa';

const BuySellContent: React.FC = () => {
  return (
    <section
      aria-labelledby="buy-sell-heading"
      className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12"
    >
      {/* Main Text Content */}
      <div className="lg:w-1/2 space-y-5 text-[#333333]">
        {/* Title + Icon */}
        <div className="inline-flex items-center gap-3 mb-1">
          <FaHandshake className="text-[#4b9328] text-2xl" aria-hidden="true" />
          <h1
            id="buy-sell-heading"
            className="text-3xl font-semibold tracking-tight text-[#0f5028]"
          >
            Funding Buy-Sell Agreements
          </h1>
        </div>

        <p className="leading-relaxed">
          A Buy-Sell agreement funded with life insurance helps ensure business continuity when a
          partner passes away or can no longer participate in the business. This strategy provides
          the liquidity surviving partners need to purchase the deceased partner&apos;s share from
          their heirs, minimizing disruption and uncertainty.
        </p>

        <p className="leading-relaxed">
          In essence, a Buy-Sell agreement functions as a &quot;business will.&quot; It&apos;s a
          formal, legally binding document that outlines how ownership will be transferred and how
          the transaction will be funded—typically through a well-structured life insurance policy.
        </p>

        {/* Why It Matters */}
        <div className="pt-4 border-t border-[#d4d4d4]">
          <div className="flex items-center gap-2 mb-3">
            <FaBalanceScale className="text-[#4b9328]" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-[#0f5028]">
              Why It Matters
            </h2>
          </div>
          <ul className="space-y-2 text-[#333333]">
            {[
              'Ensures a smooth, pre-arranged ownership transition',
              'Provides immediate liquidity to surviving shareholders',
              'Protects the financial interests of the deceased partner\'s heirs',
              'Reduces the risk of disputes, delays, or legal challenges',
              'Helps preserve operational and financial stability for the business',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-[#4b9328]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Supporting Insights */}
      <div className="lg:w-1/2 space-y-5 text-[#333333]">
        <div className="flex items-center gap-2">
          <FaFileSignature className="text-[#4b9328]" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-[#0f5028]">How We Help</h2>
        </div>

        <p className="leading-relaxed">
          We collaborate closely with your legal and accounting advisors to help ensure your
          Buy-Sell agreement is structured correctly and aligned with your business goals. Our role
          is to design and implement the insurance component so that it integrates smoothly with
          your ownership structure and succession plan.
        </p>

        {/* Planning Tip Callout */}
        <div className="mt-4 rounded-xl border border-[#8cbe3f] bg-[#f1f7ea] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="text-[#4b9328]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide uppercase text-[#0f5028]">
              Planning Tip
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#0f5028] font-medium leading-relaxed">
            Don&apos;t delay funding your agreement. Life insurance eligibility depends on age,
            health, and financial status. Waiting can lead to higher premiums—or, in some cases,
            losing the ability to secure coverage altogether.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuySellContent;