import BusinessLayout from '../../components/BusinessLayout';

const BusinessOverhead: React.FC = () => {
  return (
    <BusinessLayout pageTitle="Business Overhead Insurance">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Text */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-6">Business Overhead Insurance</h1>
          <p className="mb-4">
            Business Overhead Expense Insurance covers your essential business expenses if you're unable to work due to illness or injury. It ensures your rent, utilities, employee salaries, and more continue to be paid while you recover.
          </p>
          <p className="mb-4">
            Benefits begin after a waiting period (typically 30, 60, or 90 days) and continue until you recover or reach the policy’s maximum payout.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Highlights</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Premiums may be tax-deductible</li>
            <li>Partial disability and recurrence coverage available</li>
            <li>Premiums waived after extended disability</li>
            <li>Death benefit payable to your estate</li>
          </ul>
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <img 
            src="/images/business-overhead.jpg" 
            alt="Professional reviewing business expenses" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </BusinessLayout>
  );
};

export default BusinessOverhead;