import React from 'react';

const CriticalIllness: React.FC = () => (
  <div className="lg:w-full">
    <h1 className="text-3xl font-bold mb-6">Critical Illness Insurance</h1>
    <p className="mb-4">
      Critical illness insurance provides a tax-free lump-sum payment if you're diagnosed with a covered life-altering condition. Unlike disability insurance, the benefit is paid even if you're still able to work.
    </p>
    <p className="mb-4">
      This coverage helps you handle medical expenses, travel for treatment, supplement income, or simply focus on recovery without financial stress. There are no restrictions on how you use the benefit.
    </p>
    <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Critical Illness Coverage?</h2>
    <ul className="list-disc list-inside space-y-2">
      <li>Receive funds upon diagnosis of a covered condition</li>
      <li>Use the money however you choose — no receipts required</li>
      <li>Coverage typically includes cancer, heart attack, stroke, and more</li>
      <li>Return-of-premium options may refund your payments if you remain healthy</li>
    </ul>
    <h2 className="text-2xl font-semibold mt-8 mb-4">Additional Insights</h2>
    <p className="mb-4">
      If you pass away while the policy is in force, some plans offer a refund of premiums to your beneficiary. This added feature enhances value for long-term peace of mind.
    </p>
    <p className="mb-4">
      Whether you want to explore alternative treatments, seek out-of-country care, or hire additional support during recovery, this insurance puts you in control at a critical time.
    </p>
  </div>
);

export default CriticalIllness;