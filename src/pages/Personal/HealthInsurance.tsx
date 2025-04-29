import React from "react";
import PersonalLayout from "components/PersonalLayout";

const HealthInsurance: React.FC = () => {
  return (
    <PersonalLayout pageTitle="Health Insurance">
      <section className="space-y-6">
        <p>
          Health insurance is a form of protection that provides financial coverage for medical expenses resulting from illness or injury. It can also cover preventative services like vaccinations, screenings, and check-ups.
        </p>

        <p>
          There are several types of health insurance policies available, each designed to meet different needs. Group health insurance is often provided by employers, while individuals and families can purchase private health insurance plans. Government programs like Medicare and Medicaid also provide coverage for eligible individuals.
        </p>

        <p>
          Choosing the right health insurance policy depends on factors such as your medical needs, budget, and whether you prefer a wider range of healthcare providers or lower out-of-pocket costs.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Key Considerations When Choosing Health Insurance</h2>

        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold">Coverage Options:</span> Look at what services are covered — hospitalization, doctor visits, prescription drugs, mental health services, etc.</li>
          <li><span className="font-semibold">Network Restrictions:</span> Some policies require you to use a specific network of doctors and hospitals.</li>
          <li><span className="font-semibold">Cost:</span> Consider premiums, deductibles, co-payments, and out-of-pocket maximums.</li>
          <li><span className="font-semibold">Flexibility:</span> Some plans require referrals for specialists, others do not.</li>
        </ul>

        <p>
          Health insurance not only protects your finances, but it also gives you access to preventive care that can help you stay healthier and catch health issues early when they are more treatable.
        </p>
      </section>
    </PersonalLayout>
  );
};

export default HealthInsurance;