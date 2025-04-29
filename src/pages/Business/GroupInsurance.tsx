import BusinessLayout from '../../components/BusinessLayout';

const BusinessGroupInsurance: React.FC = () => {
  return (
    <BusinessLayout pageTitle="Group Insurance">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Text */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-6">Group Insurance Plans</h1>
          <p className="mb-4">
            A strong group insurance plan is one of the best ways to attract and retain top talent. Offering health, life, and disability insurance shows employees you value them and their families.
          </p>
          <p className="mb-4">
            We customize group plans to suit your budget, future claims experience, and the evolving healthcare landscape.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Advantages</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Boosts employee satisfaction and loyalty</li>
            <li>Flexible, cost-effective plans</li>
            <li>Covers employees and their dependents</li>
          </ul>
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <img 
            src="/images/group-insurance.jpg" 
            alt="Team discussing group insurance plans" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </BusinessLayout>
  );
};

export default BusinessGroupInsurance;