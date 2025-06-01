import React from 'react';

const PersonalDisabilityInsurance: React.FC = () => (
  <div className="lg:w-full">
    <h1 className="text-3xl font-bold mb-6">Personal Disability Insurance</h1>
    <p className="mb-4">
      Your ability to earn an income is one of your most valuable assets. Personal disability insurance protects your income if you're unable to work due to injury or illness. It ensures you can continue meeting financial obligations while focusing on your recovery.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
    <p className="mb-4">
      Disability insurance replaces a portion of your income through monthly payments while you're disabled. Policies vary based on definitions like "own occupation" vs. "any occupation," waiting periods, and benefit duration.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Why It's Important</h2>
    <ul className="list-disc list-inside space-y-2 mb-4">
      <li>Disabilities are more likely than premature death during working years</li>
      <li>Protects your lifestyle and financial independence</li>
      <li>Benefits can be used for daily expenses, medical bills, or savings preservation</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Key Considerations</h2>
    <ul className="list-disc list-inside space-y-2">
      <li>Choose a waiting period that aligns with your emergency savings</li>
      <li>Understand benefit duration—some policies cover until age 65</li>
      <li>Ask about recurrence and waiver of premium clauses</li>
    </ul>

    <p className="text-sm text-gray-600 italic mt-4">
      Disability insurance can be tailored to your profession, budget, and risk tolerance. Work with an advisor to find the right protection plan.
    </p>
  </div>
);

export default PersonalDisabilityInsurance;