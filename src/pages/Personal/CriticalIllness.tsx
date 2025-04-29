import React from "react";
import PersonalLayout from "components/PersonalLayout";

const CriticalIllness: React.FC = () => {
  return (
    <PersonalLayout pageTitle="Critical Illness Insurance">
      <section className="space-y-6">
        <p>
          Critical Illness insurance is a relatively new form of protection that provides money while you are still alive. It has tremendous flexibility if you become critically ill because there are no requirements for how you spend the lump sum amount of money that you receive. You don't have to obtain approval for expenditures, you don't have to provide any receipts, and you don't even have to spend the money on medical expenses.
        </p>

        <p>
          Critical Illness insurance provides you with a lump-sum payment to be used however you see fit. If you want to try alternative therapies, be treated in France, hire someone to take care of you, or you want to hire a nanny to take care of your children... you choose how to spend your money.
        </p>

        <p>
          If you die while the policy is in force, your beneficiary usually receives a refund of 100% of the premiums that you paid into your Critical Illness policy. This is a common feature in most policies.
        </p>
      </section>
    </PersonalLayout>
  );
};

export default CriticalIllness;