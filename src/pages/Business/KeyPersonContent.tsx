import React from 'react';

const KeyPersonContent: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-10">
      {/* Main Content */}
      <div className="lg:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-[#0a4020]">Key Person Insurance</h1>
        <p className="mb-4">
          Key Person Insurance is designed to protect your business from the financial consequences of losing
          a vital team member due to death or disability. Whether they are a founder, executive, top salesperson,
          or subject-matter expert, losing a key employee can severely disrupt operations and profitability.
        </p>
        <p className="mb-4">
          These policies provide a financial cushion, allowing time and resources for your business to
          recover, recruit, and train a suitable replacement—while also offering potential benefits to
          employees or their families.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#127038]">Why Key Person Coverage Matters</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Ensures operational and revenue continuity</li>
          <li>Helps fund the recruitment and training of successors</li>
          <li>Can include living benefits or support for families</li>
          <li>Enhances your employee retention strategy</li>
        </ul>
      </div>

      {/* Supporting Insights */}
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-xl font-semibold text-[#127038]">Protecting People and Performance</h2>
        <p>
          Many businesses underestimate the impact of losing a top contributor—until it happens. By proactively
          insuring key individuals, you demonstrate foresight, leadership, and a deep respect for the value
          your people bring to your organization.
        </p>
        <p>
          Some key person plans are dual-purpose: they protect the business while also offering benefits to
          the insured employee or their loved ones. This flexibility can make the policy a powerful recruitment
          and retention tool.
        </p>

        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 rounded">
          <strong className="block font-semibold text-green-800 mb-2">Advisor Insight:</strong>
          <p className="text-green-900">
            Collaborate with your advisor to tailor a solution. Every business and employee role is unique—
            your coverage should be too.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyPersonContent;
