import BusinessLayout from '../../components/BusinessLayout';

const BusinessDisabilityInsurance: React.FC = () => {
  return (
    <BusinessLayout pageTitle="Disability Insurance">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Text */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-6">Disability Insurance</h1>
          <p className="mb-4">
            Disability Insurance replaces a portion of your income if injury or illness prevents you from working. It protects your ability to meet financial obligations and maintain your lifestyle during recovery.
          </p>
          <p className="mb-4">
            Policies differ based on coverage type: "own occupation," "any occupation," and variations in benefit periods.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Disability Risk by Age</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 font-semibold">Age</th>
                  <th className="py-2 px-4 font-semibold">Male (%)</th>
                  <th className="py-2 px-4 font-semibold">Female (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4">25</td><td className="py-2 px-4">40.7%</td><td className="py-2 px-4">46.8%</td></tr>
                <tr><td className="py-2 px-4">30</td><td className="py-2 px-4">38.9%</td><td className="py-2 px-4">44.6%</td></tr>
                <tr><td className="py-2 px-4">35</td><td className="py-2 px-4">37.1%</td><td className="py-2 px-4">41.9%</td></tr>
                <tr><td className="py-2 px-4">40</td><td className="py-2 px-4">35.1%</td><td className="py-2 px-4">38.3%</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img 
            src="/images/disability-insurance.jpg" 
            alt="Individual reviewing disability insurance options" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </BusinessLayout>
  );
};

export default BusinessDisabilityInsurance;