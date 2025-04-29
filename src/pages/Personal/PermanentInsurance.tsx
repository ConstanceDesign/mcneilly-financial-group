import React from "react";
import PersonalLayout from "components/PersonalLayout";

const PermanentInsurance: React.FC = () => {
  return (
    <PersonalLayout pageTitle="Permanent Insurance">
      <section className="space-y-6">
        <p>
          Permanent life insurance provides lifetime protection and typically includes a savings component, known as the policy’s cash value. Unlike term insurance, which provides coverage for a specific period, permanent insurance remains active as long as premiums are paid.
        </p>

        <p>
          The most common use of permanent insurance is to cover final expenses, such as funeral costs. A typical recommended amount for final expenses is around $10,000.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Other Uses for Permanent Insurance</h2>

        <p>
          Beyond final expenses, permanent insurance can help cover outstanding debts, provide for a surviving spouse or family, or supplement retirement income through the cash value component.
        </p>

        <p>
          However, at McNeilly Financial Group Inc., we often find that individuals may over-prioritize permanent insurance early in life, neglecting the importance of living benefits. These benefits, such as disability insurance, address much more probable risks than early death.
        </p>

        <p>
          A common recommended strategy is to purchase term insurance while young, to allocate more budget to living benefits, and later use term-to-permanent conversion options if health declines or if permanent insurance becomes more appropriate.
        </p>
      </section>
    </PersonalLayout>
  );
};

export default PermanentInsurance;