import BusinessLayout from '../../components/BusinessLayout';

const BusinessKeyPerson: React.FC = () => {
  return (
    <BusinessLayout pageTitle="Key Person Insurance">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Text */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-6">Key Person Insurance</h1>
          <p className="mb-4">
            Key Person Insurance protects your business from the financial impact of losing a critical employee due to death or disability. It's essential for continuity and recovery during unexpected transitions.
          </p>
          <p className="mb-4">
            Coverage can also provide benefits to employees and their families, serving as an attractive retention tool.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Protects revenue and operations</li>
            <li>Provides funds to recruit and train replacements</li>
            <li>Offers dual benefits for businesses and employees</li>
          </ul>
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <img 
            src="/images/key-person.jpg" 
            alt="Important team member highlighted in meeting" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </BusinessLayout>
  );
};

export default BusinessKeyPerson;