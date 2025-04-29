import BusinessLayout from '../../components/BusinessLayout';

const BusinessHealthInsurance: React.FC = () => {
  return (
    <BusinessLayout pageTitle="Health Insurance">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Text */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-6">Health Insurance Solutions</h1>
          <p className="mb-4">
            Health insurance protects you against significant medical costs. Choosing plans with strong lifetime limits, comprehensive coverage, and early enrollment can make all the difference.
          </p>
          <p className="mb-4">
            For small businesses, group plans and Cost Plus options offer valuable tax advantages while protecting owners and employees.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Pro Tips</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Enroll while healthy to avoid exclusions</li>
            <li>Look for high coverage limits ($1M+ lifetime)</li>
            <li>Use tax advantages if self-employed</li>
          </ul>
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <img 
            src="/images/health-insurance.jpg" 
            alt="Family looking over health insurance options" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </BusinessLayout>
  );
};

export default BusinessHealthInsurance;