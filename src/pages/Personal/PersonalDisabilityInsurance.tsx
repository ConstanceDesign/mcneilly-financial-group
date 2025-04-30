import React from "react";
import PersonalLayout from "components/PersonalLayout";

const DisabilityInsurance: React.FC = () => {
  return (
    <PersonalLayout pageTitle="Disability Insurance">
      <section className="space-y-6">
        <p>
          Disability insurance provides you with financial security when an accident or illness causes you to be disabled and unable to work or earn an income, which is normally one's greatest asset.
        </p>

        <p>
          Disability insurance replaces a portion of your income if you become unable, through injury or illness, to work. Policies differ on how soon you would collect benefits and for how long. They also vary in whether disability benefits are received if you can't perform the duties of your own occupation, a job in your field, or any job at all.
        </p>

        <p>
          Disability insurance benefits are almost always payable on a monthly basis, while the disability continues. Upon recovery from a disability, the policy continues. Benefits could potentially be payable again for subsequent disabilities or for the recurrence of a prior disability. If the disability insurance policy is paying a disability benefit to the insured and they die, a nominal life insurance benefit is usually payable in a lump sum and will end the contract.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Why Do I Need Disability Insurance?</h2>

        <p>
          Most people are unaware of the startling disability statistics. Often they have purchased life insurance to protect their families in the event of death before even considering disability insurance.
        </p>

        <p>
          In fact, the odds are far greater that a person will become disabled in a given year than that he or she will die. There is at least a nine times greater chance of suffering a disability of at least 90 days as compared to the chances of death (up to age 37). While death may be inevitable, disability is more probable at any given age as illustrated below:
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">25</th>
                <th className="border border-gray-300 px-4 py-2">30</th>
                <th className="border border-gray-300 px-4 py-2">35</th>
                <th className="border border-gray-300 px-4 py-2">40</th>
                <th className="border border-gray-300 px-4 py-2">45</th>
                <th className="border border-gray-300 px-4 py-2">50</th>
                <th className="border border-gray-300 px-4 py-2">55</th>
                <th className="border border-gray-300 px-4 py-2">60</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">Male</td>
                <td className="border border-gray-300 px-4 py-2">407</td>
                <td className="border border-gray-300 px-4 py-2">389</td>
                <td className="border border-gray-300 px-4 py-2">371</td>
                <td className="border border-gray-300 px-4 py-2">351</td>
                <td className="border border-gray-300 px-4 py-2">325</td>
                <td className="border border-gray-300 px-4 py-2">290</td>
                <td className="border border-gray-300 px-4 py-2">236</td>
                <td className="border border-gray-300 px-4 py-2">150</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">Female</td>
                <td className="border border-gray-300 px-4 py-2">468</td>
                <td className="border border-gray-300 px-4 py-2">446</td>
                <td className="border border-gray-300 px-4 py-2">419</td>
                <td className="border border-gray-300 px-4 py-2">383</td>
                <td className="border border-gray-300 px-4 py-2">336</td>
                <td className="border border-gray-300 px-4 py-2">279</td>
                <td className="border border-gray-300 px-4 py-2">208</td>
                <td className="border border-gray-300 px-4 py-2">121</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 mt-2">*Sources: 1985 Commissioner's Disability Table A (Experience Table) & CIA 86-92 Aggregate Mortality Table.</p>
      </section>
    </PersonalLayout>
  );
};

export default DisabilityInsurance;