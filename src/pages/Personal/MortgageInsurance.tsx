import React from 'react';

const MortgageInsurance: React.FC = () => (
  <div className="lg:w-full">
    <h1 className="text-3xl font-bold mb-6">Mortgage Insurance Options</h1>
    <p className="mb-4">
      Mortgage insurance protects your loved ones by paying off your mortgage if you pass away. There are two common approaches: lender-provided mortgage insurance or personally owned term life insurance.
    </p>
    <p className="mb-4">
      While bank-issued mortgage insurance may seem convenient, individually owned policies often provide better value, more flexibility, and greater control over your coverage and beneficiaries.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Bank Mortgage Insurance – Pros & Cons</h2>
    <ul className="list-disc list-inside space-y-2 mb-4">
      <li><strong>Pros:</strong> Easy to obtain, no medical exam upfront, bundled with mortgage payments</li>
      <li><strong>Cons:</strong> Lender owns the policy, decreasing coverage, limited portability, and beneficiary is always the bank</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Personally Owned Term Life Insurance</h2>
    <ul className="list-disc list-inside space-y-2 mb-4">
      <li>You own the policy and name your own beneficiary</li>
      <li>Coverage amount stays level and can be tailored to your needs</li>
      <li>Policy stays with you even if you change lenders or pay off your mortgage early</li>
      <li>Can include features like conversion to permanent insurance and living benefit riders</li>
    </ul>

    <p className="mb-4">
      Choosing the right mortgage protection strategy can make a lasting difference in your family's financial security. Our advisors can help you compare options and make an informed choice.
    </p>
  </div>
);

export default MortgageInsurance;