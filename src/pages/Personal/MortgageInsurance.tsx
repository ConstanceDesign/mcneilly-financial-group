import React from "react";
import PersonalLayout from "components/PersonalLayout";

const MortgageInsurance: React.FC = () => {
  return (
    <PersonalLayout pageTitle="Mortgage Insurance">
      <section className="space-y-6">
        <p>
          Mortgage insurance is designed to protect a homeowner’s ability to maintain ownership of their home if they die prematurely or become disabled. In either case, it helps ensure that your family will not lose their home due to an inability to continue mortgage payments.
        </p>

        <p>
          There are two primary types of mortgage insurance:
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold">Mortgage Life Insurance:</span> Pays off the outstanding mortgage balance if the insured homeowner dies during the coverage period.</li>
          <li><span className="font-semibold">Mortgage Disability Insurance:</span> Provides funds to cover mortgage payments if the insured becomes disabled and unable to work.</li>
        </ul>

        <p>
          Mortgage insurance policies are often structured so that benefits decrease in line with the declining mortgage balance. This ensures that the coverage matches the actual liability over time.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Why Consider Mortgage Insurance?</h2>

        <p>
          Protecting your family home can be one of the most important aspects of your overall financial security plan. Mortgage insurance can provide peace of mind, knowing that your loved ones will have a place to live even if something happens to you.
        </p>

        <p>
          Some people prefer to use term life or disability insurance policies to cover mortgage obligations instead of specialized mortgage insurance products because of the greater flexibility and potential cost savings.
        </p>
      </section>
    </PersonalLayout>
  );
};

export default MortgageInsurance;