import React from "react";
import PersonalLayout from "components/PersonalLayout";

const TermInsurance: React.FC = () => {
  return (
    <PersonalLayout pageTitle="Term Insurance">
      <section className="space-y-6">
        <p>
          Term life insurance provides coverage for a specific period — such as 10, 20, or 30 years — and pays a death benefit if the insured dies within the term. It’s often the most affordable type of life insurance, especially for young families or individuals seeking high coverage amounts at lower premiums.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Understand the Need</h2>

        <p>
          Before purchasing term insurance, it’s important to assess why it is needed, for how long, and how your needs may change over time. A detailed financial needs analysis, including assets, liabilities, income needs, dependents, and future obligations, should be performed.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Choose the Right Product</h2>

        <p>
          Once the need is clear, select a term product that matches your financial goals. As your children grow and dependency periods shorten, your insurance needs may decrease — meaning shorter or adjustable terms could save you significant money over time.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Key Considerations</h2>

        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold">Preferred Underwriting:</span> Understand how your health status affects premium rates and eligibility. Medical underwriting classifications can vary significantly.</li>
          <li><span className="font-semibold">Policy Options:</span> Look for options like waiver of premium (if disabled), accidental death riders, child riders, and future conversion privileges.</li>
          <li><span className="font-semibold">Renewability and Conversion:</span> Know what happens at the end of the term — many policies automatically renew at higher rates but may also offer a permanent conversion feature without new underwriting.</li>
        </ul>

        <p>
          Working with a qualified advisor helps ensure you choose a term insurance product that fits your current situation — and gives flexibility for the future.
        </p>
      </section>
    </PersonalLayout>
  );
};

export default TermInsurance;